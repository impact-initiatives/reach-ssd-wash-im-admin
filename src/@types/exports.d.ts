type MapList {
  title: string;
  description: string;
  img: string;
  url: string;
}

interface Exports {
  auth0: {
    domain: string,
    clientId: string,
    audience: string,
    redirectUri: string,
  },
  apollo: {
    uri: string,
    files: string | null,
  },
  site: {
    title: string;
  };
  maps: MapList[];
}
