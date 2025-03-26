import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  FaPlus, FaSave, FaTrash, FaEdit, FaImage, 
  FaEye, FaChevronLeft, FaCalendarAlt, FaTags,
  FaSearch, FaClock
} from 'react-icons/fa';
import { articles as initialArticles } from '@/data/en.js';

function ArticleAdminPanel() {
  const { t, i18n } = useTranslation();
  const [articles, setArticles] = useState(initialArticles);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [view, setView] = useState('list'); // 'list', 'edit', 'create', 'preview'
  const [formData, setFormData] = useState({
    id: '',
    title: '',
    excerpt: '',
    content: '',
    category: '',
    date: new Date().toISOString().split('T')[0],
    image: '/placeholder-image.jpg',
    readTime: 5,
    tags: [],
    featured: false
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [currentTag, setCurrentTag] = useState('');
  const [sortBy, setSortBy] = useState('date');
  const [sortOrder, setSortOrder] = useState('desc');

  // Categories for the filter
  const categories = [
    { id: 'investing', name: 'categories.investing' },
    { id: 'saving', name: 'categories.saving' },
    { id: 'retirement', name: 'categories.retirement' },
    { id: 'realestate', name: 'categories.realestate' },
    { id: 'stocks', name: 'categories.stocks' }
  ];

  useEffect(() => {
    if (selectedArticle) {
      setFormData({
        ...selectedArticle,
        date: new Date(selectedArticle.date).toISOString().split('T')[0]
      });
    }
  }, [selectedArticle]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleTagInput = (e) => {
    if (e.key === 'Enter' && currentTag.trim() !== '') {
      e.preventDefault();
      if (!formData.tags.includes(currentTag.trim())) {
        setFormData({
          ...formData,
          tags: [...formData.tags, currentTag.trim()]
        });
      }
      setCurrentTag('');
    }
  };

  const removeTag = (tagToRemove) => {
    setFormData({
      ...formData,
      tags: formData.tags.filter(tag => tag !== tagToRemove)
    });
  };

  const saveArticle = () => {
    const currentDate = new Date().toISOString();
    
    if (view === 'create') {
      const newArticle = {
        ...formData,
        id: `article-${Date.now()}`,
        date: currentDate
      };
      
      setArticles([...articles, newArticle]);
      alert(t('admin.articleCreated'));
    } else {
      const updatedArticles = articles.map(article => 
        article.id === formData.id ? { ...formData, date: currentDate } : article
      );
      
      setArticles(updatedArticles);
      alert(t('admin.articleUpdated'));
    }
    
    setView('list');
    setSelectedArticle(null);
  };

  const deleteArticle = (id) => {
    if (window.confirm(t('admin.confirmDelete'))) {
      setArticles(articles.filter(article => article.id !== id));
      setSelectedArticle(null);
      setView('list');
    }
  };

  const filteredArticles = articles.filter(article => {
    return (
      article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  }).sort((a, b) => {
    if (sortBy === 'date') {
      return sortOrder === 'asc' 
        ? new Date(a.date) - new Date(b.date)
        : new Date(b.date) - new Date(a.date);
    } else if (sortBy === 'title') {
      return sortOrder === 'asc'
        ? a.title.localeCompare(b.title)
        : b.title.localeCompare(a.title);
    } else if (sortBy === 'category') {
      return sortOrder === 'asc'
        ? a.category.localeCompare(b.category)
        : b.category.localeCompare(a.category);
    }
    return 0;
  });

  const formatDate = (dateString) => {
    const options = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric'
    };
    return new Date(dateString).toLocaleDateString(i18n.language, options);
  };

  const calculateReadTime = (content) => {
    const wordsPerMinute = 200; // Average reading speed
    const wordCount = content.trim().split(/\s+/).length;
    const readTime = Math.ceil(wordCount / wordsPerMinute);
    return readTime > 0 ? readTime : 1; // Minimum 1 minute
  };

  // Handle image upload (mock function)
  const handleImageUpload = (e) => {
    // In a real app, you would upload to a server and get back a URL
    const file = e.target.files[0];
    if (file) {
      // For demo purposes, we'll just use a placeholder
      setFormData({
        ...formData,
        image: URL.createObjectURL(file) // This creates a temporary URL that will work only in this session
      });
    }
  };

  const renderListView = () => (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex flex-col md:flex-row justify-between items-center mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 md:mb-0">
          {t('admin.manageArticles')}
        </h2>
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative">
            <input
              type="text"
              placeholder={t('admin.searchArticles')}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <span className="absolute right-3 top-2.5 text-gray-400">
              <FaSearch />
            </span>
          </div>
          <button 
            onClick={() => {
              setFormData({
                id: '',
                title: '',
                excerpt: '',
                content: '',
                category: categories[0].id,
                date: new Date().toISOString().split('T')[0],
                image: '/placeholder-image.jpg',
                readTime: 5,
                tags: [],
                featured: false
              });
              setView('create');
            }}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center justify-center"
          >
            <FaPlus className="mr-2" /> {t('admin.newArticle')}
          </button>
        </div>
      </div>

      <div className="overflow-x-auto bg-gray-50 rounded-lg">
        <div className="flex items-center p-4 border-b border-gray-200">
          <div className="flex-1 flex justify-start items-center">
            <button 
              onClick={() => {
                setSortBy('title');
                setSortOrder(sortBy === 'title' && sortOrder === 'asc' ? 'desc' : 'asc');
              }}
              className="flex items-center text-sm font-medium text-gray-600 hover:text-blue-600"
            >
              {t('admin.title')} 
              {sortBy === 'title' && (
                <span className="ml-1">{sortOrder === 'asc' ? '↑' : '↓'}</span>
              )}
            </button>
          </div>
          <div className="flex-1 flex justify-center items-center">
            <button 
              onClick={() => {
                setSortBy('category');
                setSortOrder(sortBy === 'category' && sortOrder === 'asc' ? 'desc' : 'asc');
              }}
              className="flex items-center text-sm font-medium text-gray-600 hover:text-blue-600"
            >
              {t('admin.category')}
              {sortBy === 'category' && (
                <span className="ml-1">{sortOrder === 'asc' ? '↑' : '↓'}</span>
              )}
            </button>
          </div>
          <div className="flex-1 flex justify-center items-center">
            <button 
              onClick={() => {
                setSortBy('date');
                setSortOrder(sortBy === 'date' && sortOrder === 'asc' ? 'desc' : 'asc');
              }}
              className="flex items-center text-sm font-medium text-gray-600 hover:text-blue-600"
            >
              {t('admin.date')}
              {sortBy === 'date' && (
                <span className="ml-1">{sortOrder === 'asc' ? '↑' : '↓'}</span>
              )}
            </button>
          </div>
          <div className="w-32 text-center">
            <span className="text-sm font-medium text-gray-600">{t('admin.actions')}</span>
          </div>
        </div>

        {filteredArticles.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            {t('admin.noArticlesFound')}
          </div>
        ) : (
          filteredArticles.map(article => (
            <div key={article.id} className="flex items-center p-4 border-b border-gray-200 hover:bg-gray-100">
              <div className="flex-1 flex items-center">
                <div className="w-12 h-12 rounded overflow-hidden mr-3 bg-gray-200 flex-shrink-0">
                  <img src={article.image} alt="" className="w-full h-full object-cover" />
                </div>
                <div className="truncate font-medium">{article.title}</div>
                {article.featured && (
                  <span className="ml-2 px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                    {t('article_text.featured')}
                  </span>
                )}
              </div>
              <div className="flex-1 text-center">
                <span className="px-3 py-1 bg-gray-200 rounded-full text-sm">
                  {t(`categories.${article.category}`)}
                </span>
              </div>
              <div className="flex-1 text-center text-sm text-gray-600">
                {formatDate(article.date)}
              </div>
              <div className="w-32 flex justify-end">
                <button 
                  onClick={() => {
                    setSelectedArticle(article);
                    setView('preview');
                  }}
                  className="p-2 text-gray-600 hover:text-blue-600"
                  title={t('admin.preview')}
                >
                  <FaEye />
                </button>
                <button 
                  onClick={() => {
                    setSelectedArticle(article);
                    setView('edit');
                  }}
                  className="p-2 text-gray-600 hover:text-yellow-600"
                  title={t('admin.edit')}
                >
                  <FaEdit />
                </button>
                <button 
                  onClick={() => deleteArticle(article.id)}
                  className="p-2 text-gray-600 hover:text-red-600"
                  title={t('admin.delete')}
                >
                  <FaTrash />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );

  const renderFormView = () => (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center mb-6">
        <button
          onClick={() => {
            setView('list');
            setSelectedArticle(null);
          }}
          className="mr-4 text-gray-600 hover:text-blue-600"
        >
          <FaChevronLeft className="text-xl" />
        </button>
        <h2 className="text-2xl font-bold text-gray-800">
          {view === 'create' ? t('admin.createArticle') : t('admin.editArticle')}
        </h2>
      </div>

      <form onSubmit={(e) => {
        e.preventDefault();
        saveArticle();
      }}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-6">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                {t('admin.title')} *
              </label>
              <input
                type="text"
                id="title"
                name="title"
                required
                value={formData.title}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label htmlFor="excerpt" className="block text-sm font-medium text-gray-700 mb-1">
                {t('admin.excerpt')} *
              </label>
              <textarea
                id="excerpt"
                name="excerpt"
                required
                value={formData.excerpt}
                onChange={handleInputChange}
                rows="3"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              ></textarea>
            </div>

            <div>
              <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
                {t('admin.content')} *
              </label>
              <textarea
                id="content"
                name="content"
                required
                value={formData.content}
                onChange={(e) => {
                  const content = e.target.value;
                  setFormData({
                    ...formData,
                    content: content,
                    readTime: calculateReadTime(content)
                  });
                }}
                rows="12"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              ></textarea>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                {t('admin.featuredImage')}
              </label>
              <div className="flex flex-col items-center">
                <div className="w-full h-40 mb-4 bg-gray-200 rounded-lg overflow-hidden">
                  <img src={formData.image} alt="" className="w-full h-full object-cover" />
                </div>
                <label className="w-full flex items-center justify-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg border border-gray-300 cursor-pointer hover:bg-gray-200">
                  <FaImage className="mr-2" />
                  {t('admin.uploadImage')}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </label>
              </div>
            </div>

            <div>
              <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
                {t('admin.category')} *
              </label>
              <select
                id="category"
                name="category"
                required
                value={formData.category}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {t(category.name)}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="tags" className="block text-sm font-medium text-gray-700 mb-1">
                {t('admin.tags')}
              </label>
              <div className="flex items-center">
                <FaTags className="text-gray-400 mr-2" />
                <input
                  type="text"
                  value={currentTag}
                  onChange={(e) => setCurrentTag(e.target.value)}
                  onKeyDown={handleTagInput}
                  placeholder={t('admin.addTag')}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div className="mt-2 flex flex-wrap gap-2">
                {formData.tags.map(tag => (
                  <span 
                    key={tag} 
                    className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm flex items-center"
                  >
                    {tag}
                    <button 
                      type="button"
                      onClick={() => removeTag(tag)}
                      className="ml-2 text-blue-500 hover:text-blue-700"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            </div>

            <div>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="featured"
                  checked={formData.featured}
                  onChange={handleInputChange}
                  className="mr-2 h-5 w-5 text-blue-600 rounded focus:ring-blue-500"
                />
                <span className="text-sm font-medium text-gray-700">
                  {t('admin.markAsFeatured')}
                </span>
              </label>
            </div>

            <div className="flex items-center text-gray-600 mt-4">
              <FaCalendarAlt className="mr-2" />
              <span className="text-sm">
                {t('admin.readTime')}: {formData.readTime} {t('article_text.minRead')}
              </span>
            </div>

            <div className="mt-6 pt-6 border-t border-gray-200">
              <button
                type="submit"
                className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center justify-center"
              >
                <FaSave className="mr-2" />
                {t('admin.saveArticle')}
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );

  const renderPreviewView = () => (
    <div className="bg-white rounded-lg shadow-lg">
      <div className="relative">
        <div className="h-60 w-full overflow-hidden">
          <img 
            src={selectedArticle.image} 
            alt={selectedArticle.title} 
            className="w-full h-full object-cover"
          />
        </div>
        <button
          onClick={() => setView('list')}
          className="absolute top-4 left-4 p-2 bg-white rounded-full shadow-md text-gray-700 hover:text-blue-600"
        >
          <FaChevronLeft />
        </button>
        {selectedArticle.featured && (
          <div className="absolute top-4 right-4">
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-1 rounded-full text-sm font-medium shadow-md">
              {t('article_text.featured')}
            </span>
          </div>
        )}
      </div>

      <div className="p-6">
        <div className="flex items-center mb-4 flex-wrap">
          <span className="text-sm text-blue-600 font-medium bg-blue-50 px-3 py-1 rounded-full">
            {t(`categories.${selectedArticle.category}`)}
          </span>
          <span className="mx-2 text-gray-400">•</span>
          <span className="text-gray-500 text-sm flex items-center">
            <FaCalendarAlt className="mx-2" />
            {formatDate(selectedArticle.date)}
          </span>
          <span className="mx-2 text-gray-400">•</span>
          <span className="text-gray-500 text-sm flex items-center">
            <FaClock className="mx-1" />
            {selectedArticle.readTime} {t("article_text.minRead")}
          </span>
        </div>
        
        <h1 className="text-3xl font-bold mb-6 text-gray-900">
          {selectedArticle.title}
        </h1>
        
        <div className="prose max-w-none mb-8">
          <p className="text-lg font-medium text-gray-700 mb-6">
            {selectedArticle.excerpt}
          </p>
          <div className="whitespace-pre-line text-gray-700">
            {selectedArticle.content}
          </div>
        </div>
        
        {selectedArticle.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-8 pt-6 border-t border-gray-200">
            {selectedArticle.tags.map(tag => (
              <span 
                key={tag} 
                className="px-3 py-1 bg-gray-100 text-gray-800 rounded-full text-sm"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
        
        <div className="mt-8 flex space-x-4">
          <button
            onClick={() => {
              setSelectedArticle(selectedArticle);
              setView('edit');
            }}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center"
          >
            <FaEdit className="mr-2" /> {t('admin.edit')}
          </button>
          <button
            onClick={() => deleteArticle(selectedArticle.id)}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 flex items-center"
          >
            <FaTrash className="mr-2" /> {t('admin.delete')}
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100 py-12" dir={i18n.language === 'ar' ? 'rtl' : 'ltr'}>
      <div className="container mx-auto px-4">
        <div className="bg-blue-700 text-white p-6 rounded-t-lg">
          <h1 className="text-2xl font-bold">
            {t('admin.articleManagementSystem')}
          </h1>
        </div>
        
        <div className="mb-12">
          {view === 'list' && renderListView()}
          {(view === 'edit' || view === 'create') && renderFormView()}
          {view === 'preview' && selectedArticle && renderPreviewView()}
        </div>
      </div>
    </div>
  );
}

export default ArticleAdminPanel;