import { HASURA_ADMIN_URL } from "@/constants/commonStrings";
import { MagicUserMetadata } from "magic-sdk";

export async function isNewUser(issuer: string, token: string) {
    const operationsDoc = `
    query isNewUser($issuer: String!) {
      users(where: {issuer: {_eq: $issuer}}) {
        email
        id
        issuer
      }
    }
  `;

    const response = await queryHasuraGraphQL(
        operationsDoc,
        "isNewUser",
        { issuer },
        token
    );
    console.log({ response, issuer })
    return response?.data?.users?.length === 0 ? true : false;
}

export async function createNewUser(metadata: MagicUserMetadata, token: string) {
    const { issuer, email, publicAddress } = metadata
    const operationsDoc = `
  mutation createNewUser($email: String!, $issuer: String!, $publicAddress: String!) {
    insert_users(objects: {email: $email ,issuer: $issuer, publicAddress: $publicAddress}) {
      returning {
        email
        id
        issuer
      }
    }
  }
`;

    const response = await queryHasuraGraphQL(
        operationsDoc,
        "createNewUser",
        { email, issuer, publicAddress },
        token
    );
    console.log({ response, issuer })
    return response;
}

async function queryHasuraGraphQL(operationsDoc: string, operationName: string, variables: {}, token: string) {
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