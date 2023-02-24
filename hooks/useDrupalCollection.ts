import { drupal } from "@/lib/drupal";
import { JsonApiResource } from "next-drupal";
import { useCallback, useEffect, useState } from "react";

/**
 * Hook to get data from Drupal.
 *
 * @param entity_type
 *   The entity type to call.
 */
export interface DrupalCollection<TResponseType> {
  response: TResponseType;
  error: any;
  loading: boolean;
}

/**
 * Hook to get data from Drupal.
 *
 * @param entity_type
 */
export function useDrupalCollection<
  TResponseType extends JsonApiResource[] = JsonApiResource[]
>(entity_type: string): DrupalCollection<TResponseType> {
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
    function (entity_type): void {
      drupal
        .getResourceCollection(entity_type)
        .then((response) => {
          setResponse(response as TResponseType);
          setLoading(false);
        })
        .catch(setError);
    },
    [setResponse, setError]
  );

  useEffect(() => {
    getData(entity_type);
  }, [getData, entity_type]);

  return {
    response,
    error,
    loading,
  };
}
