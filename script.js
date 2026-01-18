document.addEventListener('DOMContentLoaded', () => {
    
    fetch('links.json')
        .then(response => response.json())
        .then(data => {
            const linkedin = document.getElementById('link-linkedin');
            const instagram = document.getElementById('link-instagram');
            
            if(linkedin) linkedin.href = data.linkedin;
            if(instagram) instagram.href = data.instagram;

            const navItems = document.querySelectorAll('.nav-item');
            if(navItems.length >= 4) {
                if (navItems[0].tagName === 'A') navItems[0].dataset.link = data.nav_onas;
                if (navItems[1].tagName === 'A') navItems[1].dataset.link = data.nav_cennik;
                if (navItems[2].tagName === 'A') navItems[2].dataset.link = data.nav_portfolio;
                if (navItems[3].tagName === 'A') navItems[3].dataset.link = data.nav_kontakt;
                
                navItems.forEach(item => {
                    if(item.tagName === 'A') {
                        item.style.cursor = 'pointer';
                        item.addEventListener('click', () => {
                            if(item.dataset.link) window.location.href = item.dataset.link;
                        });
                    }
                });
            }
        })
        .catch(e => console.error(e));

    setTimeout(() => {
        const splineContainer = document.querySelector('.crop-container');
        if (splineContainer) {
            const url = splineContainer.dataset.splineUrl;
            if (url) {
                const viewer = document.createElement('spline-viewer');
                viewer.setAttribute('url', url);
                viewer.setAttribute('loading-anim-type', 'none');
                viewer.setAttribute('events-target', 'global');
                splineContainer.appendChild(viewer);
            }
        }
    }, 200);

    document.addEventListener('dragstart', (e) => {
        if (e.target.tagName === 'IMG') {
            e.preventDefault();
        }
    });

    const ctxMenu = document.getElementById('ctx-menu');
    
    document.addEventListener('contextmenu', (e) => {
        e.preventDefault();
        const mouseX = e.clientX;
        const mouseY = e.clientY;
        
        ctxMenu.style.top = `${mouseY}px`;
        ctxMenu.style.left = `${mouseX}px`;
        ctxMenu.style.display = 'block';
    });

    document.addEventListener('click', () => {
        if (ctxMenu) ctxMenu.style.display = 'none';
    });
});