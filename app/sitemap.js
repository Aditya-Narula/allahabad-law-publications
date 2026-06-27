export default function sitemap() {

  const baseUrl =
    "https://allahabadlawpublications.co.in";

  return [

    {
      url: baseUrl,
      priority: 1,
    },

    {
      url: `${baseUrl}/publications`,
      priority: 0.95,
    },

    {
      url: `${baseUrl}/search`,
      priority: 0.9,
    },

    {
      url: `${baseUrl}/about`,
      priority: 0.9,
    },

    {
      url: `${baseUrl}/contact`,
      priority: 0.9,
    },

  ];

}