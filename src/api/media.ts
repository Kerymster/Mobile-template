import { LabelsResponse } from '~/utils/types';
import client from './client';
import { ENDPOINTS } from './constants/endpoints';

export const getMediaList = async (
  labelId: number,
  page: number = 0,
  size: number = 16
): Promise<LabelsResponse> => {
  const response = await client.get<LabelsResponse>(
    ENDPOINTS.MEDIA_LIST(labelId.toString(), page, size)
  );

  return response.data;
};
