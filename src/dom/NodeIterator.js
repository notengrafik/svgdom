import { NodeFilter } from './NodeFilter.js'
import { Node } from './Node.js'

const showThisNode = (whatToShow, node) => {
  switch (whatToShow) {
  case NodeFilter.SHOW_ALL: return true
  case NodeFilter.SHOW_ELEMENT: return node.nodeType === Node.ELEMENT_NODE
  case NodeFilter.SHOW_TEXT: return node.nodeType === Node.TEXT_NODE
  case NodeFilter.SHOW_ENTITY_REFERENCE: return node.nodeType === Node.ENTITY_REFERENCE_NODE
  case NodeFilter.SHOW_ENTITY: return node.nodeType === Node.ENTITY_NODE
  case NodeFilter.SHOW_PROCESSING_INSTRUCTION: return node.nodeType === Node.PROCESSING_INSTRUCTION_NODE
  case NodeFilter.SHOW_COMMENT: return node.nodeType === Node.COMMENT_NODE
  case NodeFilter.SHOW_DOCUMENT: return node.nodeType === Node.DOCUMENT_NODE
  case NodeFilter.SHOW_DOCUMENT_TYPE: return node.nodeType === Node.DOCUMENT_TYPE_NODE
  case NodeFilter.SHOW_DOCUMENT_FRAGMENT: return node.nodeType === Node.DOCUMENT_FRAGMENT_NODE
  case NodeFilter.SHOW_NOTATION: return node.nodeType === Node.NOTATION_NODE
  default: return false
  }
}

export class NodeIterator {
  constructor (root, whatToShow = -1, filter = new NodeFilter()) {
    this.root = root
    this.whatToShow = whatToShow
    this.filter = filter
  }

  // previousNode () {
  //   this.end = false

  //   if (this.current === this.root) return null

  //   const ret = this.current.previousNode

  //   if (ret === null) {
  //     this.current = this.current.parentNode
  //     return this.previousNode()
  //   }

  // }

  // nextNode () {
  //   if (this.end) {
  //     return null
  //   }

  //   const ret = this.current

  //   if (ret.hasChildren() && this.filter.acceptNode(ret) !== NodeFilter.FILTER_REJECT) {
  //     this.current = this.current.firstChild
  //   } else {
  //     this.current = ret.nextSibling
  //     if (this.current === null) {
  //       this.current = ret.parentNode
  //     }

  //     if (this.current === this.root) {
  //       this.end = true
  //     }
  //   }

  //   if (!showThisNode(ret) || this.filter.acceptNode(ret) !== NodeFilter.FILTER_ACCEPT) {
  //     return this.nextNode()
  //   }

  //   return ret
  // }

  * [Symbol.iterator] () {
    const nodes = this.root.childNodes

    for (const node in nodes) {
      if (!showThisNode(this.whatToShow, node)) continue

      const filterRet = this.filter.acceptNode(node)

      if (filterRet === NodeFilter.FILTER_REJECT) continue
      if (filterRet === NodeFilter.FILTER_ACCEPT) {
        yield node
      }

      yield * new NodeIterator(node, this.whatToShow, this.filter)
    }

    return this

  }
}
