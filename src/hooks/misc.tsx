import { useEffect } from 'react';

export function nextUrl(url: string) {
  const searchParams = new URLSearchParams(location.search);
  const nextUrl = searchParams.get("next") || null;

  console.log("nextUrl: ", "/"+nextUrl);
  console.log("url: ", url);

  if (nextUrl === null) {
    console.log(`redirecting to url: ${url}`)
    return url;
  } else {
    console.log(`redirecting to nextUrl: /${nextUrl}`)
    return `/${nextUrl}`;
  }
}

export function useResetNextParam(): void {
  useEffect(() => {
    const resetNextParam = (): void => {
      const urlSearchParams = new URLSearchParams(window.location.search);
      urlSearchParams.delete('next');
      const newUrl = `${window.location.pathname}?${urlSearchParams.toString()}`;
      window.history.replaceState({}, '', newUrl);
    };

    resetNextParam();
  }, []);
}

// if next url is not defined from the searchParams
// then give the url arg as the next url
// else
// give the next url as the next url