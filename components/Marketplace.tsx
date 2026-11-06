"use client";

import { useMemo, useState } from "react";
import { bnbListings, carListings, categories, money, products } from "@/lib/data";

type Section = "home" | "shopping" | "bnbs" | "cars" | "owners";

export default function Marketplace() {
  const [section, setSection] = useState<Section>("home");
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("featured");
  const [basket, setBasket] = useState<number[]>([]);
  const [notice, setNotice] = useState("");
  const [ownerListings, setOwnerListings] = useState<{name:string; type:string; price:string; area:string}[]>([]);
  const [enquiry, setEnquiry] = useState({name:"", phone:"", date:"", notes:""});

  const visibleProducts = useMemo(() => {
    let rows = products.filter(p =>
      (category === "All" || p.category === category) &&
      `${p.name} ${p.seller} ${p.location}`.toLowerCase().includes(query.toLowerCase())
    );
    if (sort === "low") rows = [...rows].sort((a,b) => a.price-b.price);
    if (sort === "high") rows = [...rows].sort((a,b) => b.price-a.price);
    return rows;
  }, [category, query, sort]);

  const total = basket.reduce((sum, id) => sum + (products.find(p => p.id === id)?.price ?? 0), 0);
  const flash = (message: string) => { setNotice(message); window.setTimeout(() => setNotice(""), 3200); };

  function sendEnquiry(event: React.FormEvent<HTMLFormElement>, listing: string) {
    event.preventDefault();
    if (!enquiry.name.trim() || !enquiry.phone.trim() || !enquiry.date) {
      flash("Please add your name, phone number and requested date.");
      return;
    }
    flash(`Demo enquiry prepared for ${listing}. No message has been sent yet.`);
    setEnquiry({name:"", phone:"", date:"", notes:""});
  }

  return (
    <>
      <header className="topbar">
        <button className="brand" onClick={() => setSection("home")} aria-label="Supa Maket home">supa<span>maket</span><small>KENYA&apos;S CONNECTED MARKETPLACE</small></button>
        <nav className="navlinks" aria-label="Main navigation">
          {([["home","Home"],["shopping","Shopping"],["bnbs","BnBs"],["cars","Car hire"],["owners","For owners"]] as [Section,string][]).map(([id,label]) =>
            <button key={id} className={section===id?"navactive":""} onClick={() => {setSection(id);setNotice("");}}>{label}</button>
          )}
        </nav>
        <button className="basket" onClick={() => flash(`Basket: ${basket.length} items · ${money(total)}. Checkout is not enabled yet.`)}>Basket ({basket.length})</button>
      </header>

      <main className="page">
        {notice && <div className="notice" role="status">{notice}</div>}

        {section === "home" && <section className="homeHero">
          <div className="heroShade"></div><div className="heroContent">
            <span className="kicker">ONE MARKETPLACE. MORE POSSIBILITIES.</span>
            <h1>Discover more.<br/><em>Shop smarter.</em></h1>
            <p>Explore products, find places to stay and compare cars for hire — all in one place.</p>
            <div className="heroActions"><button className="button light" onClick={() => setSection("shopping")}>Explore shopping</button><button className="button outlineLight" onClick={() => setSection("bnbs")}>Find a stay</button></div>
          </div>
          <div className="heroFoot"><span>SHOP LOCAL</span><span>DISCOVER IN ONE PLACE</span><span>KENYA · KSh</span></div>
        </section>}

        {section === "home" && <section className="introGrid">
          <button className="featureTile shopTile" onClick={() => setSection("shopping")}><span>01 / SHOPPING</span><strong>Find what<br/>you need.</strong><small>Browse independent shops →</small></button>
          <button className="featureTile bnbTile" onClick={() => setSection("bnbs")}><span>02 / STAYS</span><strong>Stay somewhere<br/>special.</strong><small>Explore BnBs →</small></button>
          <button className="featureTile carTile" onClick={() => setSection("cars")}><span>03 / MOBILITY</span><strong>Your next trip<br/>starts here.</strong><small>Find a car →</small></button>
        </section>}

        {section === "shopping" && <section>
          <div className="photoHeader shoppingHeader"><span className="kicker">THE MARKETPLACE</span><h1>Good finds.<br/><em>Better choices.</em></h1><p>Discover products from independent shops and compare sample prices.</p></div>
          <div className="sectionHeading"><div><span className="kicker dark">SHOP BY CATEGORY</span><h2>Explore products</h2></div><span className="muted">{visibleProducts.length} results</span></div>
          <div className="toolbar"><input aria-label="Search products" placeholder="Search products, shops or towns..." value={query} onChange={e=>setQuery(e.target.value)}/><select aria-label="Sort products" value={sort} onChange={e=>setSort(e.target.value)}><option value="featured">Featured</option><option value="low">Price: low to high</option><option value="high">Price: high to low</option></select></div>
          <div className="chips">{categories.map(c=><button key={c} className={category===c?"chip selected":"chip"} onClick={()=>setCategory(c)}>{c}</button>)}</div>
          <div className="productGrid">{visibleProducts.map(p=><article className="productCard" key={p.id}><div className="productArt"><span>{p.emoji}</span><small>{p.category}</small></div><div className="productInfo"><small>{p.seller} · {p.location}</small><h3>{p.name}</h3><strong>{money(p.price)}</strong><p>{p.description}</p><button className="button full" onClick={()=>{setBasket(old=>[...old,p.id]);flash(`${p.name} added to your demo basket.`);}}>Add to basket</button></div></article>)}</div>
          {visibleProducts.length===0 && <p className="empty">No matching products. Try another search or category.</p>}
          <p className="fineprint">Sample catalogue for development. Prices and sellers are illustrative, not live offers.</p>
        </section>}

        {section === "bnbs" && <section>
          <div className="photoHeader bnbHeader"><span className="kicker">STAYS & GETAWAYS</span><h1>Find your place<br/><em>to unwind.</em></h1><p>Explore accommodation and send a booking enquiry to a provider.</p></div>
          <div className="sectionHeading"><div><span className="kicker dark">PLACES TO STAY</span><h2>Featured BnBs</h2></div><span className="muted">Nightly rates</span></div>
          <div className="listingGrid">{bnbListings.map(item=><article className="stayCard" key={item.id}><div className="stayArt">⌂<span>DEMO LISTING</span></div><div className="listingInfo"><span className="muted">{item.area} · Up to {item.guests} guests</span><h3>{item.name}</h3><p>{item.detail}</p><strong>{money(item.price)} <small>/ night</small></strong><form onSubmit={e=>sendEnquiry(e,item.name)} className="enquiry"><input placeholder="Your name" value={enquiry.name} onChange={e=>setEnquiry({...enquiry,name:e.target.value})}/><input placeholder="Phone number" value={enquiry.phone} onChange={e=>setEnquiry({...enquiry,phone:e.target.value})}/><label>Requested check-in <input type="date" value={enquiry.date} onChange={e=>setEnquiry({...enquiry,date:e.target.value})}/></label><button className="button full">Send enquiry</button></form></div></article>)}</div>
          <p className="fineprint">Enquiries are demo-only and are not sent to property owners. No availability is confirmed.</p>
        </section>}

        {section === "cars" && <section>
          <div className="photoHeader carHeader"><span className="kicker">MOVE YOUR WAY</span><h1>Find a ride.<br/><em>Make the trip.</em></h1><p>Compare sample vehicles, rental rates and service options.</p></div>
          <div className="sectionHeading"><div><span className="kicker dark">AVAILABLE CATEGORIES</span><h2>Cars for hire</h2></div><span className="muted">Daily rates</span></div>
          <div className="listingGrid">{carListings.map(item=><article className="stayCard" key={item.id}><div className="carArt">↗<span>VEHICLE PREVIEW</span></div><div className="listingInfo"><span className="muted">{item.area} · {item.mode}</span><h3>{item.name}</h3><p>{item.detail}</p><strong>{money(item.price)} <small>/ day</small></strong><form onSubmit={e=>sendEnquiry(e,item.name)} className="enquiry"><input placeholder="Your name" value={enquiry.name} onChange={e=>setEnquiry({...enquiry,name:e.target.value})}/><input placeholder="Phone number" value={enquiry.phone} onChange={e=>setEnquiry({...enquiry,phone:e.target.value})}/><label>Requested pick-up date <input type="date" value={enquiry.date} onChange={e=>setEnquiry({...enquiry,date:e.target.value})}/></label><button className="button full">Send enquiry</button></form></div></article>)}</div>
          <p className="fineprint">Vehicle listings and rates are illustrative. Enquiries are not transmitted and no vehicle is reserved.</p>
        </section>}

        {section === "owners" && <OwnerPanel listings={ownerListings} onAdd={item=>{setOwnerListings(old=>[item,...old]);flash("Your listing has been added to this browser's demo owner panel.");}}/>}
      </main>
      <footer className="footer"><div className="footerBrand">supa<span>maket</span></div><p>One connected marketplace for shopping, stays and mobility.</p><small>Development preview · Sample data · No live transactions</small></footer>
    </>
  );
}

function OwnerPanel({listings,onAdd}:{listings:{name:string;type:string;price:string;area:string}[];onAdd:(x:{name:string;type:string;price:string;area:string})=>void}) {
  const [form,setForm] = useState({name:"",type:"Shop product",price:"",area:""});
  function submit(e:React.FormEvent<HTMLFormElement>){e.preventDefault();if(!form.name.trim()||!form.price.trim()||!form.area.trim())return;onAdd(form);setForm({name:"",type:"Shop product",price:"",area:""});}
  return <section className="ownerPage"><div className="ownerHero"><span className="kicker">GROW WITH SUPA MAKET</span><h1>Bring your business<br/><em>to more people.</em></h1><p>Prepare a sample listing for your shop, BnB or car-hire service.</p></div><div className="ownerColumns"><form className="ownerForm" onSubmit={submit}><h2>Create a listing</h2><label>Listing name<input required value={form.name} onChange={e=>setForm({...form,name:e.target.value})} placeholder="e.g. Wireless headphones"/></label><label>Business type<select value={form.type} onChange={e=>setForm({...form,type:e.target.value})}><option>Shop product</option><option>BnB</option><option>Car hire</option></select></label><label>Price in KSh<input required type="number" min="1" value={form.price} onChange={e=>setForm({...form,price:e.target.value})} placeholder="e.g. 2500"/></label><label>Town / service area<input required value={form.area} onChange={e=>setForm({...form,area:e.target.value})} placeholder="e.g. Kapsabet"/></label><button className="button full">Add demo listing</button><small className="muted">This is a local demo only. It does not create an account or publish your listing.</small></form><div className="ownerListings"><h2>Your demo listings</h2>{listings.length===0?<p className="empty">Your listings will appear here after you add one.</p>:listings.map((x,i)=><article className="ownerItem" key={i}><div><strong>{x.name}</strong><small>{x.type} · {x.area}</small></div><b>{money(Number(x.price)||0)}</b></article>)}</div></div></section>;
}
