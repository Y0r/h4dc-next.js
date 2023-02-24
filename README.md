# Drupal Client hooks for Next.js framework

Allows to fetch data using drupal client on component level. Easy to use, easy to include in your project.

## How to include in my project?

1) Copy hooks folder and place it into the root of the react.
2) That all.

## How to use hooks on component level?

### Fetch Collection of entities:

    import { useDrupalCollection } from "../../hooks/useDrupalCollection";  
    export function Component() {  
      const { response, error, loading } = useDrupalCollection( 
        "entity_type--entity_bundle",
      );  
      
      return ();
    }

### Fetch single entity of entities:

    import { useDrupalResource } from "../../hooks/useDrupalResource";
    
    export function Component() {  
      const { response, error, loading } = useDrupalResource(  
        "entity_type--entity_bundle",
        "entity_uuid"
      ); 
      
      return ();
    } 
