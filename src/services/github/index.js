import axios from 'axios';

const USER_API_URL = 'https://api.github.com/users';
const PAGE_SIZE = 100;

async function makeGetRequest(url) {
    try {
        const request = {
            method: 'get',
            url: url,
            headers: {
                'Content-Type': 'application/json',
            },
        };
        const resp = await axios(request);
        return resp.data;
    } catch (err) {
        throw err;
    }
}

async function getUserInfo(login) {
    const userInfo = await makeGetRequest(`${USER_API_URL}/${login}`);
    return userInfo;
}

async function getFollowInfoCommon(urlBase, cntPages) {
    let promises = [];
    for (let i = 1; i <= cntPages; i++) {
        promises.push(makeGetRequest(`${urlBase}?page=${i}&per_page=${PAGE_SIZE}`));
    }
    const followCards = await Promise.all(promises);
    return followCards.reduce((results, chunk) => results.concat(chunk), []);
}

async function getUserFollowers(login, cntFollowerPages) {
    const urlBase = `${USER_API_URL}/${login}/followers`;
    return getFollowInfoCommon(urlBase, cntFollowerPages);
}

async function getUserFollowing(login, cntFollowingPages) {
    const urlBase = `${USER_API_URL}/${login}/following`;
    return getFollowInfoCommon(urlBase, cntFollowingPages);
}

async function getUserFriends(login) {
    const userInfo = await getUserInfo(login);
    const cntFollowerPages = Math.ceil(userInfo.followers / PAGE_SIZE);
    const cntFollowingPages = Math.ceil(userInfo.following / PAGE_SIZE);
    const promises = [
        getUserFollowers(login, cntFollowerPages),
        getUserFollowing(login, cntFollowingPages)
    ];

    const followInfo = await Promise.all(promises);
    const followersIds = followInfo[0].map((follower) => follower.id);

    let friends = followInfo[1].filter((following) => {
        return followersIds.indexOf(following.id) > -1;
    });

    return friends;
}

export {
    getUserInfo,
    getUserFriends
}
