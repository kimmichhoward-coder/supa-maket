"use client";

import { useMemo, useState } from "react";

const products = [
  { id: 1, name: "Wireless headphones", category: "Electronics", price: 2499, seller: "Nairobi Tech Hub" },
  { id: 2, name: "Everyday backpack", category: "Fashion", price: 1800, seller: "Urban Finds" },
  { id: 3, name: "Table lamp", category: "Home & Living", price: 1350, seller: "Home Corner" },
  { id: 4, name: "Running shoes", category: "Sports", price: 3200, seller: "Active Store" },
  { id: 5, name: "Skincare set", category: "Beauty", price: 2100, seller: "Glow Shop" },
  { id: 6, name: "Coffee maker", category: "Electronics", price: 5600, seller: "Nairobi Tech Hub" }
];

const stays = [
  { name: "Piara Valley Homes", area: "Kapsabet", price: 3500, detail: "Comfortable short-stay accommodation" },
  { name: "Valley View Stay", area: "Nandi Hills", price: 4200, detail: "Quiet stay with scenic surroundings" },
  { name: "Town Centre Apartment", area: "Kapsabet", price: 2800, detail: "Convenient self-catering apartment" }
];

const cars = [
  { name: "Toyota Axio", type: "Self-drive", price: 4500, area: "Kapsabet" },
  { name: "Toyota Noah", type: "With driver", price: 8500, area: "Eldoret" },
  { name: "Toyota Fielder", type: "Self-drive", price: 5000, area: "Nairobi" }
];

export default function Home() {
  const [page, setPage] = useState("Home");
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [basket, setBasket] = useState<number[]>([]);
  const [notice, setNotice] = useState("");
  const [ownerName, setOwnerName] = useState("");
  const [listing, setListing] = useState("");

  const shown = useMemo(() => products.filter(p =>
    (category === "All" || p.category === category) &&
    (p.name + p.category + p.seller).toLowerCase().includes(search.toLowerCase())
  ), [search, category]);

  function add(id: number) {
    setBasket(old => [...old, id]);
    setNotice("Added to your demo basket.");
  }

  function submitOwner(e: React.FormEvent) {
    e.preventDefault();
    if (!ownerName.trim() || !listing.trim()) {
      setNotice("Enter your business name and listing title.");
      return;
    }
    setNotice(`Demo listing for ${ownerName} saved in this browser session. It is not published.`);
    setOwnerName(""); setListing("");
  }

  return <main>
    <header className="topbar">
      <button className="brand" onClick={() => setPage("Home")}>Supa <span>Maket</span></button>
      <nav>{["Home", "Shopping", "BnBs", "Car Hire", "For Owners"].map(x =>
        <button key={x} className={page === x ? "active" : ""} onClick={() => {setPage(x); setNotice("");}}>{x}</button>
      )}</nav>
      <div className="basket">Basket <b>{basket.length}</b></div>
    </header>

    {page === "Home" && <section className="hero homeHero">
      <div className="heroText"><p className="eyebrow">ONE PLACE. MORE POSSIBILITIES.</p><h1>Discover more.<br/><em>Shop smarter.</em></h1>
        <p>Explore independent shops, comfortable stays and reliable car hire in one simple marketplace.</p>
        <div className="actions"><button className="primary" onClick={() => setPage("Shopping")}>Explore shopping</button><button className="light" onClick={() => setPage("BnBs")}>Find a stay</button></div>
      </div>
    </section>}

    {page !== "Home" && <section className={`sectionHero ${page === "Shopping" ? "shopHero" : page === "BnBs" ? "bnbHero" : page === "Car Hire" ? "carHero" : "ownerHero"}`}>
      <div><p className="eyebrow">SUPA MAKET</p><h1>{page}</h1><p>{page === "Shopping" ? "Compare products from different independent sellers." : page === "BnBs" ? "Find a place to stay for your next trip." : page === "Car Hire" ? "Explore vehicles and rental options." : "Bring your business to more customers."}</p></div>
    </section>}

    {page === "Shopping" && <section className="content">
      <div className="toolbar"><input placeholder="Search products or shops..." value={search} onChange={e => setSearch(e.target.value)}/>
        <select value={category} onChange={e => setCategory(e.target.value)}>{["All", ...Array.from(new Set(products.map(p => p.category)))].map(c => <option key={c}>{c}</option>)}</select></div>
      <div className="grid">{shown.map(p => <article className="card" key={p.id}><div className="productArt">✦</div><small>{p.category}</small><h3>{p.name}</h3><p className="muted">Seller: {p.seller}</p><div className="cardBottom"><strong>KSh {p.price.toLocaleString("en-KE")}</strong><button onClick={() => add(p.id)}>Add to basket</button></div></article>)}</div>
    </section>}

    {page === "BnBs" && <section className="content"><div className="grid">{stays.map(s => <article className="card" key={s.name}><div className="stayArt">⌂</div><small>{s.area}</small><h3>{s.name}</h3><p className="muted">{s.detail}</p><div className="cardBottom"><strong>KSh {s.price.toLocaleString("en-KE")} / night</strong><button onClick={() => setNotice(`Enquiry started for ${s.name}. Add live contact and availability before launch.`)}>Enquire</button></div></article>)}</div></section>}

    {page === "Car Hire" && <section className="content"><div className="grid">{cars.map(c => <article className="card" key={c.name}><div className="carArt">🚘</div><small>{c.area} · {c.type}</small><h3>{c.name}</h3><p className="muted">Sample vehicle listing. Confirm details with provider.</p><div className="cardBottom"><strong>KSh {c.price.toLocaleString("en-KE")} / day</strong><button onClick={() => setNotice(`Enquiry started for ${c.name}. Live availability is not connected yet.`)}>Enquire</button></div></article>)}</div></section>}

    {page === "For Owners" && <section className="content ownerForm"><h2>List your business</h2><p className="muted">Try the sample owner form. This version does not create a secure account or publish listings.</p><form onSubmit={submitOwner}><label>Business name<input value={ownerName} onChange={e => setOwnerName(e.target.value)} placeholder="Your business name"/></label><label>Listing title<input value={listing} onChange={e => setListing(e.target.value)} placeholder="Product, property or vehicle"/></label><button className="primary">Save demo listing</button></form></section>}

    {notice && <div className="notice" role="status">{notice}<button onClick={() => setNotice("")}>Dismiss</button></div>}
    <footer><b>Supa Maket</b><span>Discover. Compare. Connect.</span><small>Prototype only · Sample listings · No live bookings or payments</small></footer>
  </main>;
}
