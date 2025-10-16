export function createCacheHandler() {
  return {
    async get(key) {
      try {
        const data = await NEXT_INC_CACHE_R2_BUCKET.get(key);
        if (!data) return null;
        return JSON.parse(await data.text());
      } catch (error) {
        console.error("Cache get error:", error);
        return null;
      }
    },

    async set(key, data, options) {
      try {
        await NEXT_INC_CACHE_R2_BUCKET.put(key, JSON.stringify(data), {
          expirationTtl: options?.revalidate || 3600,
        });
      } catch (error) {
        console.error("Cache set error:", error);
      }
    },
  };
}
