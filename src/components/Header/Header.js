import React,{useState,useRef,useEffect} from "react";
import { Link } from "react-router-dom";
import { FaChartLine, FaHome, FaInfoCircle, FaBars, FaTimes } from "react-icons/fa";
import "./Header.css";

const Header=()=>{
  const [isMenuOpen,setIsMenuOpen]=useState(false);
  const menuRef=useRef(null);
  const toggleButtonRef=useRef(null);
  const [headerGradient,setHeaderGradient]=useState(generateRandomGradient());
  const canvasRef=useRef(null);

  const toggleMenu=()=>setIsMenuOpen(prev=>!prev);

  useEffect(()=>{
    const handleClickOutside=(e)=>{
      if(
        menuRef.current&&!menuRef.current.contains(e.target)&&
        toggleButtonRef.current&&!toggleButtonRef.current.contains(e.target)
      ){
        setIsMenuOpen(false);
      }
    };
    document.addEventListener("mousedown",handleClickOutside);
    document.addEventListener("touchstart",handleClickOutside);
    return()=>{
      document.removeEventListener("mousedown",handleClickOutside);
      document.removeEventListener("touchstart",handleClickOutside);
    };
  },[]);

  useEffect(()=>{
    const interval=setInterval(()=>{
      setHeaderGradient(generateRandomGradient());
    },3600000);
    return()=>clearInterval(interval);
  },[]);

  useEffect(()=>{
    const canvas=canvasRef.current;
    const ctx=canvas.getContext("2d");
    let width,height,snowflakes=[];

    const resize=()=>{
      width=canvas.width=window.innerWidth;
      height=canvas.height=120;
    };

    const createSnowflakes=()=>{
      snowflakes=[];
      const count=window.innerWidth>768?30:15;
      for(let i=0;i<count;i++){
        snowflakes.push({
          x:Math.random()*width,
          y:Math.random()*height,
          r:Math.random()*3+1,
          d:Math.random()*1+0.5,
          speedX:Math.random()*0.5-0.25,
        });
      }
    };

    const draw=()=>{
      ctx.clearRect(0,0,width,height);
      ctx.fillStyle="white";
      ctx.beginPath();
      for(let f of snowflakes){
        ctx.moveTo(f.x,f.y);
        ctx.arc(f.x,f.y,f.r,0,Math.PI*2,true);
      }
      ctx.fill();
      update();
    };

    const update=()=>{
      for(let f of snowflakes){
        f.y+=f.d;
        f.x+=f.speedX;
        if(f.y>height){
          f.y=0;
          f.x=Math.random()*width;
        }
        if(f.x>width||f.x<0)f.speedX=-f.speedX;
      }
    };

    const loop=()=>{
      draw();
      requestAnimationFrame(loop);
    };

    resize();
    createSnowflakes();
    loop();
    window.addEventListener("resize",resize);
    return()=>window.removeEventListener("resize",resize);
  },[]);

  function generateRandomGradient(){
    const colors=[
      ["#4a148c","#880e4f"],["#667eea","#764ba2"],["#1e3c72","#2a5298"],
      ["#4a148c","#1a237e"],["#8e2de2","#4a00e0"],["#1488cc","#2b32b2"],
      ["#00c6ff","#0072ff"],["#ff5f6d","#ffc371"],["#c0392b","#8e44ad"]
    ];
    const [c1,c2]=colors[Math.floor(Math.random()*colors.length)];
    return `linear-gradient(135deg,${c1},${c2})`;
  }

  return(
    <header className="header" style={{background:headerGradient,position:"relative"}}>
      <canvas ref={canvasRef} style={{position:"absolute",top:0,left:0,width:"100%",height:"100%",pointerEvents:"none",zIndex:1}}/>
      <nav className="navbar" style={{position:"relative",zIndex:2}}>
        <div className="logo-container">
          <Link to="/" className="logo">
            <FaChartLine className="logo-icon"/>
            <span className="logo-text">Algorithms Visualizers</span>
          </Link>
        </div>
        <div className="menu-container">
          <button
            className="menu-toggle"
            ref={toggleButtonRef}
            onClick={toggleMenu}
            aria-label={isMenuOpen?"Close Menu":"Open Menu"}
          >
            <div className="menu-icon-wrapper">
              {isMenuOpen?<FaTimes className="menu-icon close-icon"/>:<FaBars className="menu-icon bars-icon"/>}
            </div>
          </button>
          <nav className={`menu-nav ${isMenuOpen?"open":""}`} ref={menuRef}>
            <ul className="menu-list">
              <li className="menu-item"><Link to="/" className="menu-link" onClick={()=>setIsMenuOpen(false)}><FaHome/> Home</Link></li>
              <li className="menu-item"><Link to="/huffman-visualizer" className="menu-link" onClick={()=>setIsMenuOpen(false)}><FaChartLine/> Huffman Visualizer</Link></li>
              <li className="menu-item"><Link to="/about" className="menu-link" onClick={()=>setIsMenuOpen(false)}><FaInfoCircle/> About</Link></li>
            </ul>
          </nav>
        </div>
      </nav>
    </header>
  );
};

export default Header;
