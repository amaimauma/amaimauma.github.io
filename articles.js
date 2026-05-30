const RSS_URL = 'https://note.com/umeda1230/rss';
const API_URL = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(RSS_URL)}`;

async function getNoteArticles() {
    const cached = sessionStorage.getItem('note_rss_articles');
    if (cached) {
        return JSON.parse(cached);
    }

    try {
        const response = await fetch(API_URL);
        const data = await response.json();
        if (data.status === 'ok') {
            const articles = data.items;
            sessionStorage.setItem('note_rss_articles', JSON.stringify(articles));
            return articles;
        }
        return null;
    } catch (error) {
        console.error('Failed to fetch RSS:', error);
        return null;
    }
}

async function initNoteArticles() {
    const articles = await getNoteArticles();
    const fullContainer = document.getElementById('full-articles-container');

    if (!articles) {
        if (fullContainer) {
            fullContainer.innerHTML = '<p style="text-align: center; opacity: 0.5; font-family: var(--font-serif);">記事の取得に失敗しました。時間をおいて再度お試しください。</p>';
        }
        return;
    }

    if (fullContainer) {
        fullContainer.innerHTML = ''; // ローディング表示をクリア
        
        articles.forEach((item, index) => {
            const articleDiv = document.createElement('a');
            articleDiv.href = item.link;
            articleDiv.target = '_blank';
            articleDiv.rel = 'noopener noreferrer';
            articleDiv.className = 'article-row-card';
            
            // 和モダンのフェードインアニメーションの付与
            articleDiv.style.opacity = '0';
            articleDiv.style.transform = 'translateY(30px)';
            articleDiv.style.animation = 'fadeSlideUp 0.8s cubic-bezier(0.25, 1, 0.5, 1) forwards';
            articleDiv.style.animationDelay = `${index * 0.08}s`;

            // サムネイル画像コンテナ
            const imgBox = document.createElement('div');
            imgBox.className = 'article-img-box';

            const imgSrc = item.thumbnail || item.enclosure?.link || 'assets/sky.jpg';
            const img = document.createElement('img');
            img.src = imgSrc;
            img.alt = '';
            img.loading = 'lazy'; // パフォーマンス最適化
            
            imgBox.appendChild(img);
            articleDiv.appendChild(imgBox);

            // 記事詳細情報
            const detailsDiv = document.createElement('div');
            detailsDiv.className = 'article-details';

            const title = document.createElement('h3');
            title.textContent = item.title;

            // 日付を日本の表記に整形
            const dateStr = item.pubDate ? new Date(item.pubDate).toLocaleDateString('ja-JP', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            }) : '';
            
            const dateEl = document.createElement('p');
            dateEl.className = 'article-row-date';
            dateEl.textContent = dateStr;

            detailsDiv.appendChild(title);
            detailsDiv.appendChild(dateEl);

            articleDiv.appendChild(detailsDiv);
            fullContainer.appendChild(articleDiv);
        });
    }
}

document.addEventListener('DOMContentLoaded', initNoteArticles);
