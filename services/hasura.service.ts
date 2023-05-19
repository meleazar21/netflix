import { HASURA_ADMIN_URL, HASURA_KEY } from "@/constants/commonStrings";

async function queryHasuraGraphQL(operationsDoc: string, operationName: string, variables: {}) {
    const result = await fetch(HASURA_ADMIN_URL,
        {
            method: "POST",
            headers: {
                'x-hasura-admin-secret': `${HASURA_KEY}`
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

function fetchMyQuery() {
    const operationsDoc = `
    query MyQuery {
      users {
        email
        id
        issuer
        publicAddress
      }
    }
  `;
    return queryHasuraGraphQL(
        operationsDoc,
        "MyQuery",
        {}
    );
}

export async function startFetchMyQuery() {
    const { errors, data } = await fetchMyQuery();

    if (errors) {
        // handle those errors like a pro
        console.error(errors);
    }

    // do something great with this precious data
    console.log(data);
}
