//Inspired by https://github.com/snoguchi/node-fetch-with-proxy
import { Response } from 'node-fetch';
import fetch from 'node-fetch';
import ProxyAgent from 'proxy-agent';
function fetchWrapper(url: string, options: any): Promise<Response> {
  const proxy = process.env.HTTP_PROXY || process.env.HTTP_PROXY;
  if (proxy) {
    const proxyAgent = new ProxyAgent(proxy);
    options.agent = proxyAgent;
    return fetch(url, options);

  } else {
    return fetch(url, options);
  }
}

export default fetchWrapper;