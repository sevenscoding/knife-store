export async function initMocking() {
  const { worker } = await import('./browser')

  worker.start({
    onUnhandledRequest(req, print) {
      console.log(req)

      return;
    }
  })
}
