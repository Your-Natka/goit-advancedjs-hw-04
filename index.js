import{a as b,S as L,i as a}from"./assets/vendor-73qhTu8_.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))i(t);new MutationObserver(t=>{for(const o of t)if(o.type==="childList")for(const d of o.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&i(d)}).observe(document,{childList:!0,subtree:!0});function s(t){const o={};return t.integrity&&(o.integrity=t.integrity),t.referrerPolicy&&(o.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?o.credentials="include":t.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function i(t){if(t.ep)return;t.ep=!0;const o=s(t);fetch(t.href,o)}})();const w="55701586-2004722afdcef8f633333a26a",v="https://pixabay.com/api/";async function h(e,r){const s={key:w,q:e,page:r,per_page:15,image_type:"photo",orientation:"horizontal",safesearch:!0};return(await b.get(v,{params:s})).data}const n={gallery:document.querySelector(".gallery"),loader:document.querySelector(".loader"),loadMoreBtn:document.querySelector(".load-more")},M=new L(".gallery a",{captionsData:"alt",captionDelay:250});function q(e){return`
    <li class="gallery-item">
      <a href="${e.largeImageURL}">
        <img 
          src="${e.webformatURL}" 
          alt="${e.tags}" 
          loading="lazy"
        />
      </a>

      <div class="info">
        <p><b>Likes</b> ${e.likes}</p>
        <p><b>Views</b> ${e.views}</p>
        <p><b>Comments</b> ${e.comments}</p>
        <p><b>Downloads</b> ${e.downloads}</p>
      </div>
    </li>
  `}function y(e){const r=e.map(q).join("");n.gallery.insertAdjacentHTML("beforeend",r),M.refresh()}function B(){n.gallery.innerHTML=""}function g(){n.loader.classList.remove("is-hidden")}function p(){n.loader.classList.add("is-hidden")}function S(){n.loadMoreBtn.classList.remove("is-hidden")}function f(){n.loadMoreBtn.classList.add("is-hidden")}let l="",c=1;const m=document.querySelector(".form"),u=document.querySelector(".load-more");m.addEventListener("submit",async e=>{if(e.preventDefault(),l=e.target.elements["search-text"].value.trim(),!l){a.warning({message:"Please enter a search query!"});return}c=1,B(),f();try{g();const r=await h(l,c);if(r.hits.length===0){a.error({message:"Nothing found"});return}y(r.hits),Math.ceil(r.totalHits/15)>1?S():(f(),a.info({message:"We're sorry, but you've reached the end of search results."})),m.reset()}catch{a.error({message:"Error fetching images"})}finally{p()}});u.addEventListener("click",async()=>{if(l){c+=1;try{g(),u.disabled=!0;const e=await h(l,c);y(e.hits);const r=Math.ceil(e.totalHits/15);c>=r&&(f(),a.info({message:"We're sorry, but you've reached the end of search results."}));const s=document.querySelector(".gallery li");if(s){const i=s.getBoundingClientRect().height;window.scrollBy({top:i*2,behavior:"smooth"})}}catch{a.error({message:"Error loading more"})}finally{p(),u.disabled=!1}}});
//# sourceMappingURL=index.js.map
