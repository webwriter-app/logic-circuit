import fs from 'fs';

export default {
  /** Globs to analyze */
  globs: ['./widgets/webwriter-logic-circuit.ts'],

  /** Directory to output CEM to */
  outDir: './',

  /** Enable special handling for litelement */
  litelement: true,

  /** Plugins */
  plugins: [
    // Plugin to extract full JSDoc descriptions by parsing source manually
    {
      name: 'full-jsdoc-extractor',
      packageLinkPhase({customElementsManifest}) {
        try {
          const sourceContent = fs.readFileSync('./widgets/webwriter-logic-circuit.ts', 'utf-8');
          
          // Extract the main class JSDoc comment manually
          const classCommentMatch = sourceContent.match(/\/\*\*([\s\S]*?)\*\/[\s]*@customElement[\s\S]*?export default class LogicCircuit/);
          
          if (classCommentMatch && customElementsManifest?.modules?.[0]?.declarations?.[0]) {
            const fullComment = classCommentMatch[1]
              .split('\n')
              .map(line => line.replace(/^\s*\*\s?/, ''))
              .join('\n')
              .trim();
            
            customElementsManifest.modules[0].declarations[0].description = fullComment;
          }
          
          // Extract property descriptions
          const propertyPattern = /\/\*\*([\s\S]*?)\*\/[\s]*@property[\s\S]*?accessor\s+(\w+)/g;
          const propertyComments = [...sourceContent.matchAll(propertyPattern)];
          
          if (customElementsManifest?.modules?.[0]?.declarations?.[0]?.members) {
            const members = customElementsManifest.modules[0].declarations[0].members;
            
            propertyComments.forEach(match => {
              const fullComment = match[1]
                .split('\n')
                .map(line => line.replace(/^\s*\*\s?/, ''))
                .join('\n')
                .trim();
              const propertyName = match[2];
              
              const member = members.find(m => m.name === propertyName);
              if (member) {
                member.description = fullComment;
              }
            });
          }
          
          // Extract method descriptions  
          const methodPattern = /\/\*\*([\s\S]*?)\*\/[\s]*(\w+)\s*\([^{]*\)\s*{/g;
          const methodComments = [...sourceContent.matchAll(methodPattern)];
          
          if (customElementsManifest?.modules?.[0]?.declarations?.[0]?.members) {
            const members = customElementsManifest.modules[0].declarations[0].members;
            
            methodComments.forEach(match => {
              const fullComment = match[1]
                .split('\n')
                .map(line => line.replace(/^\s*\*\s?/, ''))
                .join('\n')
                .trim();
              const methodName = match[2];
              
              const member = members.find(m => m.name === methodName);
              if (member) {
                member.description = fullComment;
              }
            });
          }
          
          // Update attribute descriptions to match the full property descriptions
          if (customElementsManifest?.modules?.[0]?.declarations?.[0]?.attributes && 
              customElementsManifest?.modules?.[0]?.declarations?.[0]?.members) {
            const attributes = customElementsManifest.modules[0].declarations[0].attributes;
            const members = customElementsManifest.modules[0].declarations[0].members;
            
            attributes.forEach(attribute => {
              // Find the corresponding member (property) by fieldName
              const correspondingMember = members.find(m => m.name === attribute.fieldName);
              
              if (correspondingMember && correspondingMember.description) {
                // Copy the full description from the member to the attribute
                attribute.description = correspondingMember.description;
              }
            });
          }
          
          // Extract and enhance event descriptions from @fires JSDoc tags
          const firesPattern = /@fires\s+([a-zA-Z-]+)\s+-\s+([^\r\n]+)/g;
          const firesMatches = [...sourceContent.matchAll(firesPattern)];
          
          if (customElementsManifest?.modules?.[0]?.declarations?.[0]?.events && firesMatches.length > 0) {
            const events = customElementsManifest.modules[0].declarations[0].events;
            
            firesMatches.forEach(match => {
              const eventName = match[1];
              const eventDescription = match[2];
              
              const existingEvent = events.find(e => e.name === eventName);
              if (existingEvent) {
                // Enhance with the full description from JSDoc
                existingEvent.description = eventDescription;
              }
            });
          }
          
        } catch (error) {
          console.warn('Could not read source file for full JSDoc extraction:', error.message);
        }
      }
    }
  ]
};