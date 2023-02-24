import { drupal } from "@/lib/drupal";
import { JsonApiResource } from "next-drupal";
import { useCallback, useEffect, useState } from "react";

/**
 * Hook to get data from Drupal.
 *
 * @param entity_type
 *   The entity type to call.
 */
export interface DrupalResource<TResponseType> {
  response: TResponseType;
  error: any;
  loading: boolean;
}

/**
 * Hook to get data from Drupal.
 *
 * @param entity_type
 *   The entity type to call.
 * @param uuid
 *   The uuid of the entity to call.
 */
export function useDrupalResource<
  TResponseType extends JsonApiResource[] = JsonApiResource[]
>(entity_type: string, uuid: string): DrupalResource<TResponseType> {
  const [response, setResponse] = useState<TResponseType>(null);
  const [error, setError] = useState<any>(false);
  const [loading, setLoading] = useState<boolean>(true);

  /**
   * Get data from Drupal.
   *
   * @param method
   *   The method to call.
   * @param entity_type
   *   The entity type to call.
   */
  const getData = useCallback(
    function (entity_type, uuid: string): void {
      drupal
        .getResource(entity_type, uuid)
        .then((response) => {
          setResponse(response as unknown as TResponseType);
          setLoading(false);
        })
        .catch(setError);
    },
    [setResponse, setError]
  );

  useEffect(() => {
    getData(entity_type, uuid);
  }, [getData, entity_type, uuid]);

  return {
    response,
    error,
    loading,
  };
}
