/*
This is an example snippet - you should consider tailoring it
to your service.
*/

async function fetchGraphQL(operationsDoc: string, operationName: string, variables: {}) {
    const result = await fetch(
        "https://legal-spider-90.hasura.app/v1/graphql",
        {
            method: "POST",
            headers: {
                'x-hasura-admin-secret': 'wWtT2cBKuNteh0YIXrSoM1XsFk4NQUokYG128uq7tSTe7wwjOVGh492QuWkMvVj0'
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

function fetchMyQuery() {
    return fetchGraphQL(
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
