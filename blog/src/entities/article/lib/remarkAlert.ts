import { visit } from "unist-util-visit";
import { Plugin } from "unified";
import { Node, Parent } from "unist";

interface Blockquote extends Parent {
  type: "blockquote";
  children: Node[];
  data?: {
    hName?: string;
    hProperties?: Record<string, unknown>;
  };
}

interface Paragraph extends Parent {
  type: "paragraph";
  children: Node[];
}

interface Text extends Node {
  type: "text";
  value: string;
}

const ALERT_REGEX = /^\[!(NOTE|TIP|IMPORTANT|WARNING|CAUTION)\]/i;

export const remarkAlert: Plugin = () => {
  return (tree) => {
    visit(tree, "blockquote", (node: Node) => {
      const blockquote = node as Blockquote;
      const firstChild = blockquote.children[0] as Paragraph;
      
      if (!firstChild || firstChild.type !== "paragraph") return;

      const firstTextNode = firstChild.children[0] as Text;
      if (!firstTextNode || firstTextNode.type !== "text") return;

      const match = firstTextNode.value.match(ALERT_REGEX);
      if (match) {
        const type = match[1].toLowerCase();
        
        // Remove the [!TYPE] marker logic:
        // If the text node contains only the marker, remove it? 
        // Or strip just the marker.
        // Usually GitHub allows `> [!NOTE] content`. 
        // The regex check matches start.
        
        // If the text node is just "[!NOTE]", remove it and let the rest remain? 
        // Or strip it from value.
        // Current logic: replace in value.
        
        // Note: We need to handle the newline possibly.
        // If content is `[!NOTE]\nActually...` -> `Actually...`
        
        const cleanValue = firstTextNode.value.replace(ALERT_REGEX, "").trim();
        
        if (cleanValue === "") {
            // If empty, maybe remove the node? 
            // Better to keep it empty for safety or remove if it was the only thing.
            // But let's just update value.
            firstTextNode.value = "";
        } else {
            firstTextNode.value = cleanValue;
        }

        // Add data attribute to the blockquote
        // remark-rehype will pass these hProperties to the HTML element
        const data = (blockquote.data || (blockquote.data = {}));
        const hProperties = (data.hProperties || (data.hProperties = {})) as Record<string, string>;
        
        hProperties["data-callout"] = type;
      }
    });
  };
};
