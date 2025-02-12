import { Dict, SupportedChain } from '@leapwallet/cosmos-wallet-sdk';

export type TokensListByCollection = { collection: { address: string; name: string }; tokens: string[] };

export type NftInfoInvestor = {
  address: string;
  allocations: number;
};

export type NFTInfo = {
  token_uri: string;
  extension: Record<string, unknown>;
  investors?: NftInfoInvestor[];
};

export type NFTInfoWithTokenId = {
  tokenUri: string;
  extension: Record<string, unknown>;
  tokenId: string;
};

export type NFTDisplayInformation = {
  name: string;
  image: string;
  properties?: { name: { description: string }; image: { description: string } };
  title?: string;
  media?: string;
};

export type FractionalizedNftInformation = {
  'Tower Name': string;
  Address: string;
  Size: string;
  'Number of Bedrooms': string;
  'Number of Bathrooms': string;
  'Additional Features': string[];
  Images: string[];
};

export type CollectionInfo = {
  name: string;
  contractAddress: string;
};

export type NFTDetailedInformation = {
  imgSrc: string;
  name: string;
  collection: string;
  description: string;
  tokenUri: string;
  collectionAddress: string;
  tokenId: string;
};

export type TokenUriModifierFn = (_: string) => string;

export type OwnedCollectionTokenInfo = {
  name: string;
  extension: Dict | null;
  image?: string;
  tokenUri?: string;
  tokenId?: string;
  description?: string;
  collection: {
    name: string;
    contractAddress: string;
    address?: string;
  };
  domain?: string;
  media_type?: string;
  attributes?: NftAttribute[];
};

export type OwnedCollectionInfo = {
  collection: {
    image: string;
    name: string;
  };
  tokens: OwnedCollectionTokenInfo[];
};

export type NftAttribute = {
  trait_type: string;
  value: string;
};

export type OmniflixNft = {
  extension: Dict | null;
  collection: {
    name: string;
    address: string;
    image: string;
  };
  description: string;
  name: string;
  image: string;
  tokenId: string;
  tokenUri: string;
  attributes?: NftAttribute[];
  media_type?: string;
};

export type NftQuery =
  | { all_tokens: unknown }
  | { tokens: { owner: string; limit: number; start_after?: string } }
  | { nft_info: { token_id: string } }
  | { all_nft_info: { token_id: string } };

export type OwnedCollectionOptions = {
  tokenUriModifier?: TokenUriModifierFn;
  forceChain?: SupportedChain;
  forceNetwork?: 'mainnet' | 'testnet';
  paginationLimit?: number;
};
