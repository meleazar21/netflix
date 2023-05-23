import { HASURA_ADMIN_URL } from "@/constants/commonStrings";

export async function queryHasuraGraphQL(operationsDoc: string, operationName: string, variables: {}, token: string) {
  const result = await fetch(HASURA_ADMIN_URL,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-type': 'application/json'
      },
      body: JSON.stringify({
        query: operationsDoc,
        variables: variables,
        operationName: operationName
      })
    }
  );

  return await result.json();
}