import React,{useState} from 'react'
import FrequencyTable from './FrequencyTable'
import HuffmanTree from './HuffmanTree'
import CodePanel from './CodePanel'
import './HuffmanVisualizer.css'

const HuffmanVisualizer=()=> {
  const[inputText,setInputText]=useState('')
  const[frequencyData,setFrequencyData]=useState([])
  const[huffmanTree,setHuffmanTree]=useState(null)
  const[codes,setCodes]=useState({})

  const generateHuffmanEncoding=()=>{
    const freqMap={}
    for(const char of inputText){
      freqMap[char]=(freqMap[char]||0)+1
    }
    const freqArray=Object.entries(freqMap).map(([char,count])=>({char,count}))
    setFrequencyData(freqArray)

    const{tree,codes}=buildHuffmanTree(freqArray)
    setHuffmanTree(tree)
    setCodes(codes)
  }

  const buildHuffmanTree=(freqArray)=>{
    const nodes=freqArray.map(({char,count})=>({char,weight:count,left:null,right:null}))
    while(nodes.length>1){
      nodes.sort((a,b)=>a.weight-b.weight)
      const[left,right]=nodes.splice(0,2)
      const newNode={char:null,weight:left.weight+right.weight,left,right}
      nodes.push(newNode)
    }

    const codes={}
    const generateCodes=(node,path='')=>{
      if(!node)return
      if(node.char)codes[node.char]=path
      generateCodes(node.left,path+'0')
      generateCodes(node.right,path+'1')
    }
    generateCodes(nodes[0])
    return{tree:nodes[0],codes}
  }

  return(
    <div className="huffman-visualizer-container">
      <div className="huffman-header">
        <h1>🔐 Huffman Encoding Visualizer</h1>
        <p>Type text, generate tree, and explore how Huffman coding compresses data!</p>
      </div>

      <div className="huffman-input-section">
        <input
          type="text"
          value={inputText}
          onChange={(e)=>setInputText(e.target.value)}
          placeholder="Enter text to encode"
          className="huffman-input"
        />
        <button onClick={generateHuffmanEncoding} className="huffman-generate-btn">Generate</button>
      </div>

      {frequencyData.length>0&&
        <div className="huffman-section">
          <h2>📊 Frequency Table</h2>
          <FrequencyTable data={frequencyData}/>
        </div>
      }

      {huffmanTree&&
        <div className="huffman-section">
          <h2>🌳 Huffman Tree</h2>
          <HuffmanTree tree={huffmanTree}/>
        </div>
      }

      {Object.keys(codes).length>0&&
        <div className="huffman-section">
          <h2>🧾 Huffman Codes</h2>
          <CodePanel codes={codes}/>
        </div>
      }
    </div>
  )
}

export default HuffmanVisualizer
