// ==========================================================================
// Japanese Modern Premium Navigation System & Layout Builder
// ==========================================================================

const navigationHTML = `
  <div class="menu-content-wrap">
    <nav>
      <ul class="menu-nav-list">
        <li><a href="index.html" class="menu-link">TOP <span>— 冊子</span></a></li>
        <li><a href="stl.html" class="menu-link">3D OBJ <span>— 立体物</span></a></li>
        <li><a href="articles.html" class="menu-link">ARTICLES <span>— 記事</span></a></li>
        <li><a href="drinks.html" class="menu-link">DRINKS <span>— 嗜好品</span></a></li>
      </ul>
    </nav>
    <div class="menu-sidebar-text">
      AMAIMAUMA
      <span>日常と創造の記録</span>
    </div>
  </div>
`;

document.addEventListener('DOMContentLoaded', () => {
  // 1. 額縁フレームの生成と挿入
  const pageFrame = document.createElement('div');
  pageFrame.className = 'page-frame';
  document.body.appendChild(pageFrame);

  // 2. 背景装飾の生成と挿入
  const bgDeco = document.createElement('div');
  bgDeco.className = 'background-decoration';
  document.body.appendChild(bgDeco);

  // 3. 右側固定の縦書きサインの生成と挿入
  const sideSign = document.createElement('div');
  sideSign.className = 'fixed-side-sign';
  sideSign.innerHTML = 'AMAIMAUMA / CREATIVE SPACE <span>甘今美味</span>';
  document.body.appendChild(sideSign);

  // 4. 固定ヘッダー（ロゴ ＋ Menuトリガー）の生成と挿入
  const header = document.createElement('header');
  header.className = 'site-header';

  // ロゴ
  const logo = document.createElement('a');
  logo.href = 'index.html';
  logo.className = 'site-logo';
  logo.innerHTML = 'AMAIMAUMA<span>甘今美味</span>';
  header.appendChild(logo);

  // トリガーボタン
  const trigger = document.createElement('button');
  trigger.className = 'menu-trigger';
  trigger.setAttribute('aria-label', 'メニューを開く');
  trigger.innerHTML = `
    <span class="menu-trigger-text">MENU</span>
    <div class="menu-trigger-icon">
      <span></span>
      <span></span>
    </div>
  `;
  header.appendChild(trigger);
  document.body.appendChild(header);

  // 5. フルスクリーンメニューの生成と挿入
  const fullMenu = document.createElement('div');
  fullMenu.className = 'fullscreen-menu';
  fullMenu.innerHTML = navigationHTML;
  document.body.appendChild(fullMenu);

  // 6. メニュー開閉トグルの制御
  let isMenuOpen = false;

  const toggleMenu = () => {
    isMenuOpen = !isMenuOpen;
    document.body.classList.toggle('menu-active', isMenuOpen);
    fullMenu.classList.toggle('is-open', isMenuOpen);

    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
      trigger.querySelector('.menu-trigger-text').textContent = ''; // CSSでCLOSEが表示される
    } else {
      document.body.style.overflow = '';
      trigger.querySelector('.menu-trigger-text').textContent = 'MENU';
    }
  };

  trigger.addEventListener('click', toggleMenu);

  // 7. メニューリンクのホバー・クリック制御
  const menuLinks = fullMenu.querySelectorAll('.menu-link');
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';

  menuLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPath) {
      link.style.color = 'var(--accent)';
      link.style.fontWeight = '400';
    }

    // リンククリック時に閉じる
    link.addEventListener('click', () => {
      if (isMenuOpen) toggleMenu();
    });
  });

  // 8. 既存フッターの最適化
  const originalFooter = document.querySelector('footer');
  if (originalFooter) {
    originalFooter.className = 'site-footer';
  }
});
