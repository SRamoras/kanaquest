import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Heading.css';



export default function Heading({
  title = 'Bem-vindo ao KanaQuest',
  text = 'Aprenda hiragana e katakana de forma interativa e divertida.',
  buttonText = 'Começar agora',
  imageSrc = '/path/to/image.png',
  onButtonClick = () => {}
}) {
  const imageRef = useRef(null);

  useEffect(() => {
    // Registra o plugin
    gsap.registerPlugin(ScrollTrigger);

    // Define a animação de width de 50% → 100% com scroll
    gsap.fromTo(
      imageRef.current,
      { width: '80%' },     // Largura inicial (ajuste como preferir)
      {
        width: '100%',      // Largura final
        ease: 'none',
        scrollTrigger: {
          trigger: imageRef.current,     // elemento que dispara
          start: 'top bottom',           // início quando topo da imagem entrar na viewport
          end: 'bottom top',             // fim quando fundo da imagem chegar ao topo
          scrub: true,                   // vincula animação ao scroll
        }
      }
    );
  }, []);

  return (
    <section className="heading">
      <div className="heading-content">
        <h2 className="heading-title">{title}</h2>
        <p className="heading-text">{text}</p>
        {/* Descomente se quiser o botão */}
        {/* <button className="heading-button" onClick={onButtonClick}>
          {buttonText}
        </button> */}
      </div>
      <div className="heading-image-wrapper">
        <img
          ref={imageRef}
          src={imageSrc}
          alt="Ilustração da landing page"
          className="heading-image"
        />
      </div>
    </section>
  );
}
