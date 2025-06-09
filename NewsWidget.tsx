import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Newspaper, ExternalLink, Clock, MapPin, Heart, RefreshCw } from 'lucide-react';
import { getHealthNews, NewsArticle } from '../services/apiService';

export function NewsWidget() {
  const [news, setNews] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchNews = async () => {
    setLoading(true);
    const articles = await getHealthNews();
    setNews(articles);
    setLoading(false);
  };

  useEffect(() => {
    fetchNews();
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleArticleClick = (url: string) => {
    if (url && url !== '#') {
      window.open(url, '_blank', 'noopener,noreferrer');
    }
  };

  const handleRefreshNews = () => {
    fetchNews();
  };

  if (loading) {
    return (
      <div className="bg-white rounded-xl p-6 shadow-soft">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <Heart className="h-5 w-5 text-primary-600 mr-2" />
            <Newspaper className="h-5 w-5 text-primary-600 mr-2" />
            <h3 className="text-lg font-semibold text-secondary-900">India Health News</h3>
          </div>
          <RefreshCw className="h-4 w-4 text-secondary-400 animate-spin" />
        </div>
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="animate-pulse">
              <div className="h-4 bg-secondary-200 rounded w-3/4 mb-2"></div>
              <div className="h-3 bg-secondary-200 rounded w-1/2"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-white rounded-xl p-6 shadow-soft"
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <div className="flex items-center">
            <MapPin className="h-4 w-4 text-orange-500 mr-1" />
            <span className="text-xs font-medium text-orange-600 bg-orange-50 px-2 py-1 rounded-full mr-3">
              India
            </span>
          </div>
          <Heart className="h-5 w-5 text-red-500 mr-2" />
          <Newspaper className="h-5 w-5 text-primary-600 mr-2" />
          <h3 className="text-lg font-semibold text-secondary-900">Health News</h3>
        </div>
        <motion.button
          onClick={handleRefreshNews}
          className="p-1 rounded-lg hover:bg-secondary-100 transition-colors duration-200"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          title="Refresh news"
        >
          <RefreshCw className="h-4 w-4 text-secondary-600" />
        </motion.button>
      </div>
      
      <div className="space-y-4">
        {news.slice(0, 3).map((article, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className="border-b border-secondary-100 pb-4 last:border-b-0 last:pb-0 cursor-pointer hover:bg-secondary-50 p-2 rounded-lg transition-colors duration-200"
            onClick={() => handleArticleClick(article.url)}
          >
            <div className="flex items-start space-x-3">
              {article.urlToImage && (
                <img
                  src={article.urlToImage}
                  alt={article.title}
                  className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
              )}
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-medium text-secondary-900 line-clamp-2 mb-1 hover:text-primary-600 transition-colors duration-200">
                  {article.title}
                </h4>
                <p className="text-xs text-secondary-600 line-clamp-2 mb-2">
                  {article.description}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-xs text-secondary-500">
                    <Clock className="h-3 w-3 mr-1" />
                    {formatDate(article.publishedAt)}
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-xs text-primary-600 font-medium bg-primary-50 px-2 py-1 rounded-full">
                      {article.source}
                    </span>
                    <motion.button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleArticleClick(article.url);
                      }}
                      className="text-xs text-primary-600 hover:text-primary-700 flex items-center"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Read
                      <ExternalLink className="h-3 w-3 ml-1" />
                    </motion.button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      
      <div className="mt-4 p-3 bg-gradient-to-r from-orange-50 to-red-50 rounded-lg border border-orange-200">
        <div className="flex items-center text-xs text-orange-800">
          <MapPin className="h-3 w-3 mr-1" />
          <span className="font-medium">Focused on Indian healthcare news and hospital updates</span>
        </div>
      </div>

      {/* View More Button */}
      <motion.button
        onClick={() => {
          window.open('https://www.google.com/search?q=india+health+news+hospitals', '_blank', 'noopener,noreferrer');
        }}
        className="mt-4 w-full btn-secondary text-sm py-2"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <Newspaper className="h-4 w-4 mr-2" />
        View More Health News
      </motion.button>
    </motion.div>
  );
}