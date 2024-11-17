export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const config = useRuntimeConfig()
  if (!config.apiKey) {
    throw createError({
      status: 400,
      statusMessage: 'Bad Request',
      message: 'API Key is required',
    })
  }
  try {
    return await $fetch(event.context.params!.path, {
      baseURL: config.baseUrl || '',
      params: {
        language: 'en-US',
        ...query,
      },
      headers: {
        Accept: 'application/json',
        authorization: `Bearer ${config.apiKey}`,
      },
    })
  }
  catch (error: any) {
    const status = error?.response?.status || 500
    const message = error?.response?._data.status_message
    console.log(message, 'we')
    throw createError({
      fatal: true,
      statusCode: status,
      statusMessage: message,
    })
  }
})
