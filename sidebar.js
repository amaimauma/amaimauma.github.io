const sidebarHTML = `
            <h2 class="sidebar-title">Menu</h2>
            <nav>
                <ul class="nav-links">
                    <li><a href="index.html" class="nav-item"><span class="nav-icon">🏠</span> トップページ</a></li>
                    <li class="nav-group">
                        <div class="nav-group-title"><span class="nav-icon">📦</span> STLダウンロード</div>
                        <ul class="sub-nav-links">
                            <li><a href="stl.html" class="nav-item">S字フック</a></li>
                            <li><a href="dummy.html" class="nav-item">仮のオブジェクト</a></li>
                        </ul>
                    </li>
                    <li class="nav-group">
                        <a href="articles.html" class="nav-group-title nav-item"><span class="nav-icon">📖</span> おすすめ記事</a>
                    </li>
                    <li class="nav-group">
                        <a href="drinks.html" class="nav-group-title nav-item"><span class="nav-icon">🍷</span> おすすめドリンク</a>
                    </li>
                </ul>
            </nav>
`;

document.addEventListener('DOMContentLoaded', () => {
    const wrapper = document.querySelector('.app-wrapper');
    if (wrapper) {
        const aside = document.createElement('aside');
        aside.className = 'sidebar';
        aside.innerHTML = sidebarHTML;
        wrapper.prepend(aside);
    }

    // Set active link visually based on current URL path
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    const links = document.querySelectorAll('.sidebar .nav-item');
    links.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPath) {
            link.classList.add('active');
            if (link.classList.contains('nav-group-title')) {
                link.style.color = 'var(--accent)';
            }
        }
    });
});
