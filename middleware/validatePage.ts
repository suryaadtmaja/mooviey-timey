export default defineNuxtRouteMiddleware((to) => {
  const allowed = ['movie', 'tv']

  const slug = Array.isArray(to.params.slug) ? to.params.slug[0] : to.params.slug

  if (!allowed.includes(slug)) {
    return navigateTo('/404')
  }
})
