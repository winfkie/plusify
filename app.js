const products = [
  {id:1,name:"Canva",category:"Design",description:"Platform desain untuk presentasi, konten, dan kebutuhan visual.",price:25000,initial:"C",bg:"#e8e2ff",color:"#7455ce",tag:"Design"},
  {id:2,name:"CapCut",category:"Editing",description:"Tools editing video untuk kebutuhan konten kreatif.",price:30000,initial:"▶",bg:"#e8edf5",color:"#29334b",tag:"Editing"},
  {id:3,name:"AI Assistant",category:"AI",description:"Asisten AI untuk membantu ide, riset, dan produktivitas.",price:45000,initial:"AI",bg:"#e5e0ff",color:"#6849c4",tag:"AI"},
  {id:4,name:"Productivity Suite",category:"Productivity",description:"Perangkat kerja digital untuk mengatur aktivitas harian.",price:40000,initial:"P",bg:"#e2f1ed",color:"#3b8b78",tag:"Productivity"},
  {id:5,name:"Design Toolkit",category:"Design",description:"Pilihan alat bantu desain untuk eksplorasi ide visual.",price:20000,initial:"D",bg:"#fff0e6",color:"#bd7448",tag:"Design"},
  {id:6,name:"Video Toolkit",category:"Editing",description:"Perangkat bantu untuk alur kerja editing video.",price:35000,initial:"V",bg:"#e9efff",color:"#5877bd",tag:"Editing"},
  {id:7,name:"Writing AI",category:"AI",description:"Bantuan AI untuk menyusun dan mengembangkan tulisan.",price:50000,initial:"W",bg:"#f3e7f4",color:"#9862a0",tag:"AI"},
  {id:8,name:"Workspace Tools",category:"Productivity",description:"Tools untuk kolaborasi dan pengelolaan pekerjaan.",price:30000,initial:"W",bg:"#e8f0e4",color:"#64824e",tag:"Productivity"}
];
let activeCategory = "Semua";
let cart = [];

const rupiah = n => new Intl.NumberFormat("id-ID",{style:"currency",currency:"IDR",maximumFractionDigits:0}).format(n);
const grid = document.getElementById("product-grid");
const cartDrawer = document.getElementById("cart-drawer");
const backdrop = document.getElementById("drawer-backdrop");

function renderProducts(){
  const term = document.getElementById("search").value.toLowerCase().trim();
  const filtered = products.filter(p => (activeCategory==="Semua" || p.category===activeCategory) && (p.name.toLowerCase().includes(term) || p.description.toLowerCase().includes(term)));
  grid.innerHTML = filtered.length ? filtered.map(p => `
    <article class="product-card">
      <div class="product-top"><div class="product-logo" style="--logo-bg:${p.bg};--logo-color:${p.color}">${p.initial}</div><span class="tag">${p.tag}</span></div>
      <h3>${p.name}</h3><p>${p.description}</p>
      <div class="product-meta"><span class="price">${rupiah(p.price)}<small> / contoh paket</small></span><button class="add-button" data-add="${p.id}" aria-label="Tambah ${p.name} ke keranjang">+</button></div>
    </article>`).join("") : `<p>Produk tidak ditemukan. Coba kata kunci lain.</p>`;
}
function renderCart(){
  document.getElementById("cart-count").textContent = cart.reduce((sum,item)=>sum+item.qty,0);
  document.getElementById("cart-items").innerHTML = cart.length ? cart.map(item=>`<div class="cart-row"><div><strong>${item.name}</strong><small>${item.qty} × ${rupiah(item.price)}</small></div><div><strong>${rupiah(item.price*item.qty)}</strong><br><button class="remove-item" data-remove="${item.id}">Hapus</button></div></div>`).join("") : `<p class="empty-cart">Keranjangmu masih kosong.</p>`;
  document.getElementById("cart-total").textContent = rupiah(cart.reduce((sum,item)=>sum+item.price*item.qty,0));
}
function openCart(){cartDrawer.classList.add("open");backdrop.classList.add("show");cartDrawer.setAttribute("aria-hidden","false")}
function closeCart(){cartDrawer.classList.remove("open");backdrop.classList.remove("show");cartDrawer.setAttribute("aria-hidden","true")}
let toastTimer;
function toast(message){const el=document.getElementById("toast");el.textContent=message;el.classList.add("show");clearTimeout(toastTimer);toastTimer=setTimeout(()=>el.classList.remove("show"),2300)}

document.getElementById("filters").addEventListener("click",e=>{const btn=e.target.closest("[data-category]");if(!btn)return;activeCategory=btn.dataset.category;document.querySelectorAll(".filter").forEach(x=>x.classList.toggle("active",x===btn));renderProducts()});
document.getElementById("search").addEventListener("input",renderProducts);
grid.addEventListener("click",e=>{const btn=e.target.closest("[data-add]");if(!btn)return;const product=products.find(p=>p.id===Number(btn.dataset.add));const existing=cart.find(x=>x.id===product.id);if(existing)existing.qty++;else cart.push({...product,qty:1});renderCart();toast(`${product.name} ditambahkan ke keranjang`)});
document.getElementById("cart-items").addEventListener("click",e=>{const btn=e.target.closest("[data-remove]");if(!btn)return;cart=cart.filter(x=>x.id!==Number(btn.dataset.remove));renderCart()});
document.getElementById("cart-open").addEventListener("click",openCart);
document.getElementById("cart-close").addEventListener("click",closeCart);
backdrop.addEventListener("click",closeCart);
document.getElementById("checkout-button").addEventListener("click",()=>{if(!cart.length){toast("Keranjang masih kosong");return}toast("Ini masih demo. Integrasi checkout dan pembayaran dibuat pada tahap backend.");});
document.getElementById("year").textContent=new Date().getFullYear();
renderProducts();renderCart();
