import { queryOptions, useQuery } from '@tanstack/react-query';

import { api } from '@/lib/api-client';
import { QueryConfig } from '@/lib/query.ts';
import { Meta } from '@/types/api.ts';
import { OllamaModelData } from '@/features/models/types/models';

export const getModels = (): Promise<{
  data: OllamaModelData[];
  meta: Meta;
}> => {
  return api.get(`/models/openai/`);
};

export const getModelsQueryOptions = () => {
  return queryOptions({
    queryKey: ['openai-models'],
    queryFn: () => getModels(),
    staleTime: 60 * 1000 * 5,
    refetchInterval: 60 * 1000 * 5,
  });
};

type UseModelsOptions = {
  queryConfig?: QueryConfig<typeof getModels>;
};

export const useOpenAiModels = ({ queryConfig }: UseModelsOptions) => {
  return useQuery({
    ...getModelsQueryOptions(),
    ...queryConfig,
  });
};
