import React, { useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import {
  ArrowDown, ArrowDownRight, ArrowLeft, ArrowRight, ArrowUpRight, Camera,
  Crosshair, Expand, MoveHorizontal, X,
} from 'lucide-react';
import '@fontsource/barlow-condensed/latin-700.css';
import '@fontsource/barlow-condensed/latin-800.css';
import '@fontsource/inter/latin-400.css';
import '@fontsource/inter/latin-600.css';
import '@fontsource/ibm-plex-mono/latin-500.css';
import { characters, gallery, heroScenes, image, locations, sources } from './media';
import HeroScene from './HeroScene';
import './style.css';

const number = (value) => String(value).padStart(2, '0');
const wrap = (index, length) => (index + length) % length;

function Mark() {
  return (
    <a className="brand" href="#top" aria-label="The Leonida Archive home">
      <span className="brand-mark">VI</span>
      <span>LEONIDA<br />ARCHIVE</span>
    </a>
  );
}

function TrailerLink({ className, children }) {
  return <a className={className} href={sources.trailer} target="_blank" rel="noreferrer">{children}</a>;
}

function Header() {
  return (
    <header className="header">
      <Mark />
      <nav aria-label="Main navigation">
        <a href="#cast">Characters</a>
        <a href="#world">Locations</a>
        <a href="#gallery">Gallery</a>
      </nav>
    </header>
  );
}

function Hero() {
  const [active, setActive] = useState(0);
  const [motion] = useState(() => matchMedia('(min-width: 900px) and (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)').matches);
  const heroRef = useRef(null);
  const rangeRef = useRef(null);
  const scene = heroScenes[active];

  return (
    <section className={'hero hero-' + scene.clip} ref={heroRef} aria-labelledby="main-title">
      <HeroScene key={scene.clip} scene={scene} heroRef={heroRef} rangeRef={rangeRef} motion={motion} />
      <div className="hero-grade" aria-hidden="true" />
      <Header />
      <div className="hero-body frame">
        <p className="overline"><span className="signal" /> THE LEONIDA ARCHIVE</p>
        <h1 id="main-title"><span>GRAND THEFT</span><span>AUTO <em>VI</em></span></h1>
        <p className="hero-subtitle">Jason, Lucia, and the world of Grand Theft Auto VI.</p>
        <a className="primary-button" href="#cast">Explore the archive <ArrowDownRight size={18} /></a>
      </div>
      <div className="hero-bottom frame">
        <div className="hero-caption" aria-live="polite"><Crosshair size={17} /><span>{scene.location}</span></div>
        <a href="#cast" className="scroll-link" aria-label="Scroll to characters"><ArrowDown size={17} /></a>
        <div className="camera-controls" data-camera-controls>
          {motion && <label className="camera-range">
            <span><MoveHorizontal size={15} /> Move mouse to scrub</span>
            <input ref={rangeRef} aria-label="Camera frame" type="range" min="0" max="100" step="1" defaultValue="50" />
          </label>}
          <div className="scene-switch" role="group" aria-label="Hero shot">
            {heroScenes.map((shot, index) => (
              <button type="button" key={shot.clip} aria-pressed={index === active} onClick={() => setActive(index)}>{shot.name}</button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function SectionHeading({ label, title, children }) {
  return (
    <div className="section-heading">
      <div><p className="overline"><span className="signal" /> {label}</p><h2>{title}</h2></div>
      {children}
    </div>
  );
}

function setCardTilt(event) {
  if (event.pointerType !== 'mouse' || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const card = event.currentTarget;
  const { left, top, width, height } = card.getBoundingClientRect();
  card.style.setProperty('--tilt-x', (0.5 - (event.clientY - top) / height) * 8 + 'deg');
  card.style.setProperty('--tilt-y', ((event.clientX - left) / width - 0.5) * 8 + 'deg');
}

function resetCardTilt(event) {
  event.currentTarget.style.removeProperty('--tilt-x');
  event.currentTarget.style.removeProperty('--tilt-y');
}

function Cast({ openCharacter }) {
  return (
    <section className="cast section-pad" id="cast">
      <div className="frame">
        <SectionHeading label="CHARACTERS" title="Meet the cast.">
          <p>Two lives collide in Vice City. Get to know the people in Jason and Lucia’s orbit.</p>
        </SectionHeading>
        <div className="cast-leads">
          {characters.slice(0, 2).map((person) => (
            <button type="button" className="lead-card" key={person.name} onClick={() => openCharacter(person)} onPointerMove={setCardTilt} onPointerLeave={resetCardTilt}>
              <img src={image(person.photo)} alt="" loading="lazy" />
              <span className="lead-info"><small>{person.tag}</small><strong>{person.name}</strong></span>
              <span className="lead-action" aria-label="View character"><ArrowUpRight size={24} /></span>
            </button>
          ))}
        </div>
        <div className="supporting-cast">
          {characters.slice(2).map((person) => (
            <button type="button" className="support-card" key={person.name} onClick={() => openCharacter(person)}>
              <img src={image(person.photo)} alt="" loading="lazy" />
              <span>{person.name}<ArrowUpRight size={14} /></span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

function World() {
  const [active, setActive] = useState(0);
  const place = locations[active];

  return (
    <section className="world section-pad" id="world">
      <div className="frame">
        <SectionHeading label="LOCATIONS" title="Across Leonida.">
          <p>Six destinations, from Vice City’s waterfront to the trails of Mount Kalaga.</p>
        </SectionHeading>
        <div className="world-deck">
          <div className="world-screen" aria-live="polite">
            <img key={place.photo} src={image(place.photo)} alt={place.name + ' in Grand Theft Auto VI'} loading="lazy" />
            <div className="world-reticle" aria-hidden="true"><Crosshair size={24} /></div>
            <div className="world-info" key={place.name}>
              <h3>{place.name}</h3>
              <p>{place.description}</p>
            </div>
          </div>
          <div className="destinations" aria-label="Choose a destination">
            {locations.map((location, index) => (
              <button key={location.name} type="button" aria-pressed={index === active} onClick={() => setActive(index)}>
                <span className="destination-index">{number(index + 1)}</span>
                <span>{location.name}</span>
                <ArrowUpRight size={15} />
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Gallery({ openImage }) {
  const [active, setActive] = useState(0);
  const [drag, setDrag] = useState(0);
  const start = useRef(null);
  const wasDragged = useRef(false);
  const current = gallery[active];

  function moveBy(step) {
    setActive((index) => wrap(index + step, gallery.length));
  }

  function onPointerDown(event) {
    if (event.button !== 0) return;
    start.current = event.clientX;
    wasDragged.current = false;
  }

  function onPointerMove(event) {
    if (start.current === null) return;
    const delta = event.clientX - start.current;
    if (Math.abs(delta) > 9) {
      wasDragged.current = true;
      setDrag(Math.min(110, Math.max(-110, delta)));
    }
  }

  function finishDrag(event) {
    if (start.current !== null && event.type === 'pointerup') {
      const delta = event.clientX - start.current;
      if (Math.abs(delta) > 42) moveBy(delta < 0 ? 1 : -1);
    }
    start.current = null;
    setDrag(0);
  }

  return (
    <section className="gallery section-pad" id="gallery">
      <div className="frame">
        <SectionHeading label="SCREENSHOTS AND ARTWORK" title="The frame archive.">
          <p>Drag to rotate the gallery. Select the center frame to view it full size.</p>
        </SectionHeading>
        <div className="gallery-stage" aria-label="3D image carousel" onPointerDown={onPointerDown} onPointerMove={onPointerMove} onPointerUp={finishDrag} onPointerLeave={finishDrag} onPointerCancel={finishDrag} onKeyDown={(event) => {
          if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
            event.preventDefault();
            moveBy(event.key === 'ArrowLeft' ? -1 : 1);
          }
        }} style={{ '--drag': drag + 'px' }}>
          {gallery.map((item, index) => {
            const offset = wrap(index - active + 4, gallery.length) - 4;
            return (
              <button className="gallery-panel" type="button" key={item.photo} data-offset={offset} tabIndex={offset === 0 ? 0 : -1}
                aria-hidden={Math.abs(offset) > 2 ? true : undefined} aria-label={(offset === 0 ? 'Open ' : 'Select ') + item.title}
                style={{ '--offset': offset, '--depth': Math.abs(offset), '--layer': 10 - Math.abs(offset) }}
                onClick={(event) => {
                  if (wasDragged.current && event.detail > 0) return;
                  if (index === active) openImage(item);
                  else setActive(index);
                }}>
                <img src={image(item.photo)} alt="" draggable={false} loading={index < 3 ? 'eager' : 'lazy'} />
                {offset === 0 && <span className="panel-expand"><Expand size={17} /></span>}
              </button>
            );
          })}
        </div>
        <div className="gallery-caption">
          <div aria-live="polite"><p className="overline">{current.type}</p><h3>{current.title}</h3></div>
          <div className="gallery-controls">
            <button type="button" className="icon-button" onClick={() => moveBy(-1)} aria-label="Previous image"><ArrowLeft size={20} /></button>
            <span>{number(active + 1)} / {number(gallery.length)}</span>
            <button type="button" className="icon-button" onClick={() => moveBy(1)} aria-label="Next image"><ArrowRight size={20} /></button>
          </div>
        </div>
      </div>
    </section>
  );
}

function MediaDialog({ item, close }) {
  const dialog = useRef(null);

  useEffect(() => {
    const element = dialog.current;
    element.showModal();
    return () => element.close();
  }, []);

  const title = item.title ?? item.name;
  return (
    <dialog className="media-dialog" ref={dialog} aria-label={title} onClose={close} onClick={(event) => {
      if (event.target === dialog.current) close();
    }}>
      <div className={item.bio ? 'dialog-card bio-dialog' : 'dialog-card'}>
        <button type="button" className="dialog-close icon-button" onClick={close} aria-label="Close" autoFocus><X size={23} /></button>
        <img src={image(item.photo)} alt={item.alt ?? item.name} />
        <div className="dialog-caption">
          <p className="overline">{item.type ?? item.tag}</p>
          <h3>{title}</h3>
          {item.bio && <p className="bio">{item.bio}</p>}
        </div>
      </div>
    </dialog>
  );
}

function Footer() {
  return (
    <>
      <section className="trailer-section" aria-labelledby="trailer-heading">
        <img src={image('trailer')} alt="" loading="lazy" />
        <div className="frame trailer-body">
          <div><p className="overline"><span className="signal" /> ROCKSTAR GAMES</p><h2 id="trailer-heading">The launch trailer.</h2></div>
          <TrailerLink className="primary-button">Watch on Rockstar Games <ArrowUpRight size={19} /></TrailerLink>
        </div>
      </section>
      <footer className="footer">
        <div className="frame footer-inner">
          <Mark />
          <p>Unofficial fan showcase. Grand Theft Auto VI imagery © Rockstar Games.</p>
          <a className="source-link" href={sources.media} target="_blank" rel="noreferrer"><Camera size={15} /> Official media <ArrowUpRight size={14} /></a>
        </div>
      </footer>
    </>
  );
}

function App() {
  const [selected, setSelected] = useState(null);

  return (
    <>
      <main id="top">
        <Hero />
        <div className="archive-content">
          <Cast openCharacter={setSelected} />
          <World />
          <Gallery openImage={setSelected} />
          <Footer />
        </div>
      </main>
      {selected && <MediaDialog item={selected} close={() => setSelected(null)} />}
    </>
  );
}

createRoot(document.getElementById('root')).render(<App />);
