module.exports = function override(config, env) {
  // Tìm rule có dùng source-map-loader
  const rule = config.module.rules.find(rule =>
    Array.isArray(rule.oneOf)
  )?.oneOf?.find(r =>
    r.enforce === 'pre' && r.use && r.use.includes && r.use.includes('source-map-loader')
  );

  // Nếu tìm thấy, thì loại trừ lucide-react khỏi quá trình xử lý source-map
  if (rule) {
    rule.exclude = [/node_modules\/lucide-react/];
  }

  return config;
};
