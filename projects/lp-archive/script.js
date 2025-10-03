// Sample LP data
const lpData = [
  {
    title: "美容サービスLP",
    category: "美容サービス",
    tags: ["キレイ", "清潔", "信頼・安心"],
    color: "pink"
  },
  {
    title: "金融サービスLP",
    category: "サービス・保険・金融",
    tags: ["信頼・安心", "シンプル", "かっこいい"],
    color: "blue"
  },
  {
    title: "健康食品LP",
    category: "健康・美容食品・サプリ",
    tags: ["オーガニック", "ナチュラル", "健康・癒し"],
    color: "green"
  },
  {
    title: "ファッションブランドLP",
    category: "ファッション",
    tags: ["スタイリッシュ", "高級・セレブ", "かっこいい"],
    color: "black"
  },
  {
    title: "旅行サービスLP",
    category: "旅行・アウトドア",
    tags: ["爽やか", "にぎやか", "透明感"],
    color: "blue"
  },
  {
    title: "インテリアショップLP",
    category: "インテリア・家具・寝具",
    tags: ["ナチュラル", "シンプル", "キレイ"],
    color: "yellow"
  },
  {
    title: "スポーツジムLP",
    category: "スポーツ",
    tags: ["力強い", "かっこいい", "爽やか"],
    color: "red"
  },
  {
    title: "不動産サービスLP",
    category: "住宅・不動産",
    tags: ["信頼・安心", "シンプル", "清潔"],
    color: "blue"
  },
  {
    title: "コスメブランドLP",
    category: "美容・スキンケア・香水",
    tags: ["高級・セレブ", "キレイ", "透明感"],
    color: "purple"
  }
];

// Color mapping
const colorGradients = {
  red: "linear-gradient(135deg, #ff6b6b, #ee5a6f)",
  blue: "linear-gradient(135deg, #4facfe, #00f2fe)",
  green: "linear-gradient(135deg, #43e97b, #38f9d7)",
  yellow: "linear-gradient(135deg, #ffd89b, #19547b)",
  purple: "linear-gradient(135deg, #a8edea, #fed6e3)",
  orange: "linear-gradient(135deg, #fa709a, #fee140)",
  pink: "linear-gradient(135deg, #f093fb, #f5576c)",
  black: "linear-gradient(135deg, #4b4b4b, #1a1a1a)"
};

// Render LP gallery
function renderLPGallery(items = lpData) {
  const gallery = document.getElementById('lp-gallery');

  if (items.length === 0) {
    gallery.innerHTML = '<p style="text-align: center; grid-column: 1/-1; padding: 3rem;">該当するLPが見つかりませんでした</p>';
    return;
  }

  gallery.innerHTML = items.map(item => `
    <div class="lp-item" data-category="${item.category}" data-color="${item.color}">
      <div class="lp-thumbnail" style="background: ${colorGradients[item.color]}">
        ${item.title}
      </div>
      <div class="lp-info">
        <h3 class="lp-title">${item.title}</h3>
        <div class="lp-tags">
          ${item.tags.map(tag => `<span class="lp-tag">${tag}</span>`).join('')}
        </div>
      </div>
    </div>
  `).join('');
}

// Filter functionality
let currentFilters = {
  color: null,
  tag: null,
  category: null
};

function filterLPs() {
  let filtered = lpData;

  if (currentFilters.color) {
    filtered = filtered.filter(item => item.color === currentFilters.color);
  }

  if (currentFilters.tag) {
    filtered = filtered.filter(item => item.tags.includes(currentFilters.tag));
  }

  if (currentFilters.category) {
    filtered = filtered.filter(item => item.category === currentFilters.category);
  }

  renderLPGallery(filtered);
}

// Color button click handlers
document.querySelectorAll('.color-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const color = btn.dataset.color;

    // Toggle active state
    document.querySelectorAll('.color-btn').forEach(b => b.classList.remove('active'));

    if (currentFilters.color === color) {
      currentFilters.color = null;
    } else {
      currentFilters.color = color;
      btn.classList.add('active');
    }

    filterLPs();
  });
});

// Tag button click handlers
document.querySelectorAll('.tag-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const tag = btn.textContent;

    // Toggle active state
    document.querySelectorAll('.tag-btn').forEach(b => b.classList.remove('active'));

    if (currentFilters.tag === tag) {
      currentFilters.tag = null;
    } else {
      currentFilters.tag = tag;
      btn.classList.add('active');
    }

    filterLPs();
  });
});

// Category card click handlers
document.querySelectorAll('.category-card').forEach(card => {
  card.addEventListener('click', () => {
    const category = card.querySelector('h3').textContent;

    // Toggle active state
    document.querySelectorAll('.category-card').forEach(c => c.classList.remove('active'));

    if (currentFilters.category === category) {
      currentFilters.category = null;
    } else {
      currentFilters.category = category;
      card.classList.add('active');
    }

    filterLPs();

    // Scroll to gallery
    document.querySelector('.gallery-section').scrollIntoView({ behavior: 'smooth' });
  });
});

// Smooth scroll for navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// Add active styles
const style = document.createElement('style');
style.textContent = `
  .color-btn.active {
    transform: translateY(-4px) scale(1.05);
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  }

  .tag-btn.active {
    border-color: var(--primary-color);
    background: var(--primary-color);
    color: var(--white);
  }

  .category-card.active {
    border: 2px solid var(--primary-color);
    transform: translateY(-4px);
  }
`;
document.head.appendChild(style);

// Initial render
renderLPGallery();
