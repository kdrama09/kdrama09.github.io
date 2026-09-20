const shows=[
 {id:1,title:"Moonlit Promise",genre:"Chinese Drama",year:"2026",eps:24,desc:"A romantic fantasy story about two strangers connected by a forgotten promise.",tag:"NEW"},
 {id:2,title:"Crimson Dynasty",genre:"Chinese Drama",year:"2026",eps:36,desc:"Power, family secrets and a dangerous alliance inside a royal court.",tag:"HOT"},
 {id:3,title:"Second Chance Love",genre:"K-Drama",year:"2026",eps:16,desc:"Two former classmates meet again and discover that some feelings never disappeared.",tag:"HOT"},
 {id:4,title:"Winter Letters",genre:"K-Drama",year:"2025",eps:12,desc:"A quiet healing romance told through letters, memories and unexpected meetings.",tag:"TOP"},
 {id:5,title:"Tokyo After Rain",genre:"Japanese Drama",year:"2025",eps:10,desc:"A young photographer rebuilds her life after returning to Tokyo.",tag:"NEW"},
 {id:6,title:"Dragon's Oath",genre:"Chinese Drama",year:"2025",eps:40,desc:"An ancient oath brings together warriors from two rival clans.",tag:"TOP"},
 {id:7,title:"Hidden Signal",genre:"K-Drama",year:"2026",eps:20,desc:"A detective receives a mysterious signal connected to an unsolved case.",tag:"NEW"},
 {id:8,title:"Island of Dreams",genre:"Asian",year:"2025",eps:8,desc:"Friends from different countries reunite on a beautiful island.",tag:"TRENDING"}
];
let currentFilter="All", favorites=new Set();

function colorFor(i){return ["#33203b,#121326","#42282b,#12151e","#222e48,#14141c","#44313d,#11131a","#183744,#11131a","#42301f,#15131a","#202c42,#11131a","#193d3b,#11131a"][i%8]}
function render(list=shows){
 const c=document.getElementById("catalog");
 c.innerHTML=list.map((s,i)=>`<article class="card" onclick="openDetails(${s.id})">
 <div class="poster" style="background:linear-gradient(145deg,${colorFor(i)})"><span class="badge">${s.tag}</span><div class="poster-title">${s.title}</div></div>
 <div class="card-info"><h3>${s.title}</h3><p>${s.genre} • ${s.eps} Episodes</p></div></article>`).join("");
}
function openDetails(id){
 const s=shows.find(x=>x.id===id); if(!s)return;
 document.getElementById("detailPoster").style.background=`linear-gradient(145deg,${colorFor(id)})`;
 document.getElementById("detailTitle").textContent=s.title;
 document.getElementById("detailGenre").textContent=s.genre;
 document.getElementById("detailDesc").textContent=s.desc;
 document.getElementById("detailMeta").textContent=`${s.year} • ${s.eps} Episodes • HD`;
 document.getElementById("episodes").innerHTML=Array.from({length:s.eps},(_,i)=>`<button class="episode" onclick="playEpisode('${s.title}',${i+1})">EP ${i+1}</button>`).join("");
 document.getElementById("watchBtn").onclick=()=>playEpisode(s.title,1);
 document.getElementById("details").classList.remove("hidden");
}
function playEpisode(title,ep){showToast(`Player ready: ${title} — Episode ${ep}`)}
function showToast(t){const x=document.getElementById("toast");x.textContent=t;x.style.display="block";clearTimeout(window.tt);window.tt=setTimeout(()=>x.style.display="none",2200)}
document.querySelectorAll(".chip").forEach(b=>b.onclick=()=>{document.querySelectorAll(".chip").forEach(x=>x.classList.remove("active"));b.classList.add("active");currentFilter=b.dataset.filter;render(currentFilter==="All"?shows:shows.filter(s=>s.genre===currentFilter||currentFilter==="Asian"&&s.genre!=="K-Drama"&&s.genre!=="Chinese Drama"))});
document.getElementById("closeDetails").onclick=()=>document.getElementById("details").classList.add("hidden");
document.getElementById("searchBtn").onclick=()=>{document.getElementById("searchModal").classList.remove("hidden");document.getElementById("searchInput").focus()};
document.getElementById("closeSearch").onclick=()=>document.getElementById("searchModal").classList.add("hidden");
document.getElementById("searchInput").oninput=e=>{const q=e.target.value.toLowerCase();document.getElementById("searchResults").innerHTML=shows.filter(s=>(s.title+" "+s.genre).toLowerCase().includes(q)).map((s,i)=>`<article class="card" onclick="openDetails(${s.id})"><div class="poster" style="background:linear-gradient(145deg,${colorFor(i)})"><div class="poster-title">${s.title}</div></div><div class="card-info"><h3>${s.title}</h3><p>${s.genre} • ${s.eps} Episodes</p></div></article>`).join("")};
document.getElementById("heroPlay").onclick=()=>openDetails(1);
document.getElementById("seeAll").onclick=()=>render(shows);
document.getElementById("moviesNav").onclick=()=>showToast("Movie catalog will be connected next.");
document.getElementById("seriesNav").onclick=()=>render(shows);
document.getElementById("favNav").onclick=()=>showToast("Favorites system ready for the next build.");

render();
setTimeout(()=>{document.getElementById("splash").classList.add("hidden");document.getElementById("app").classList.remove("hidden")},1800);
