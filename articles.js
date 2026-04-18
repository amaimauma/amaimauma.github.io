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
        if (fullContainer) fullContainer.innerHTML = '<p style="text-align: center; opacity: 0.5;">記事の取得に失敗しました。</p>';
        return;
    }

    // 記事一覧画面用（RSSで取得した全件）
    if (fullContainer) {
        fullContainer.innerHTML = ''; // ローディング状態を削除
        articles.forEach(item => {
            const articleDiv = document.createElement('a');
            articleDiv.href = item.link;
            articleDiv.target = '_blank';
            articleDiv.rel = 'noopener noreferrer';
            articleDiv.className = 'article-card';

            // Thumbnail Image
            const imgSrc = item.thumbnail || item.enclosure?.link || 'assets/sky.jpg';
            const img = document.createElement('img');
            img.src = imgSrc;
            img.className = 'article-thumbnail';
            img.alt = '';
            articleDiv.appendChild(img);

            // Info Wrapper
            const infoDiv = document.createElement('div');
            infoDiv.className = 'article-info';

            const title = document.createElement('h3');
            title.textContent = item.title;

            const dateStr = item.pubDate ? new Date(item.pubDate).toLocaleDateString() : '';
            const dateEl = document.createElement('p');
            dateEl.className = 'article-date';
            dateEl.textContent = dateStr;

            infoDiv.appendChild(title);
            infoDiv.appendChild(dateEl);

            articleDiv.appendChild(infoDiv);
            fullContainer.appendChild(articleDiv);
        });
    }
}

document.addEventListener('DOMContentLoaded', initNoteArticles);
