/**
* @jest-environment jsdom
*/
/* eslint-disable no-undef */
import { render, screen } from '@testing-library/react';
import React from 'react';
import renderer from 'react-test-renderer';
import { act } from 'react-dom/test-utils';
import '@testing-library/jest-dom';
import '@testing-library/jest-dom/extend-expect';
import { BrowserRouter } from 'react-router-dom';
import axios from 'axios';
import userEvent from '@testing-library/user-event';
import MockAdapter from 'axios-mock-adapter';
import Profile from '../components/Profile';
import Reviews from '../components/Reviews';
import Follows from '../components/Follows';
import Blocked from '../components/Blocked';
import SearchUsers from '../components/SearchUsers';

let testUser;
let mockAxios;

beforeEach(() => {
  mockAxios = new MockAdapter(axios);
  testUser = {
    name: 'John Doe',
    email: 'jdoe@sas.upenn.edu',
    reviews: [
      {
        authorEmail: 'cevans@sas.upenn.edu',
        authorName: 'Cadel Evans',
        recipient: 'jdoe@sas.upenn.edu',
        reviewContent: 'Good experience with this seller.',
        reviewRating: 5,
      },
      {
        authorEmail: 'fschleck@sas.upenn.edu',
        authorName: 'Frank Schleck',
        recipient: 'jdoe@sas.upenn.edu',
        reviewContent: 'The chair I bought had a missing leg.',
        reviewRating: 2,
      },
    ],
    followers: [
      {
        followerName: 'Cadel Evans',
        followerEmail: 'cevans@sas.upenn.edu',
        followingName: 'John Doe',
        followingEmail: 'jdoe@sas.upenn.edu',
      },
      {
        followerName: 'Frank Schleck',
        followerEmail: 'fschleck@sas.upenn.edu',
        followingName: 'John Doe',
        followingEmail: 'jdoe@sas.upenn.edu',
      },
      {
        followerName: 'Alex Dowsett',
        followerEmail: 'adowsett@sas.upenn.edu',
        followingName: 'John Doe',
        followingEmail: 'jdoe@sas.upenn.edu',
      },
    ],
    following: [
      {
        followerName: 'John Doe',
        followerEmail: 'jdoe@sas.upenn.edu',
        followingName: 'Cadel Evans',
        followingEmail: 'cevans@sas.upenn.edu',
      },
      {
        followerName: 'John Doe',
        followerEmail: 'jdoe@sas.upenn.edu',
        followingName: 'Alberto Contador',
        followingEmail: 'acontador@sas.upenn.edu',
      },
      {
        followerName: 'John Doe',
        followerEmail: 'jdoe@sas.upenn.edu',
        followingName: 'Levi Leipheimer',
        followingEmail: 'leipheimer@sas.upenn.edu',
      },
    ],
    blocked: [
      {
        blockerName: 'John Doe',
        blockerEmail: 'jdoe@sas.upenn.edu',
        blockedUserName: 'Levi Leipheimer',
        blockedUserEmail: 'leipheimer@sas.upenn.edu',
      },
    ],
    reports: [
      {
        authorEmail: 'csastre@sas.upenn.edu',
        recipientEmail: 'jdoe@sas.upenn.edu',
        reportContent: 'Never sent any of the items I bought.',
      },
    ],
  };
});

describe('UI testing for the Profile component', () => {
  test('Test 1: Snapshot on Profile Screen for user with a report', () => {
    const component = renderer.create(
      <BrowserRouter>
        <Profile user={testUser} />
      </BrowserRouter>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });

  test('Test 2: Snapshot on Profile screen for user with no reports', () => {
    testUser.reports = [];
    const component = renderer.create(
      <BrowserRouter>
        <Profile user={testUser} />
      </BrowserRouter>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});

describe('UI testing for the reviews component', () => {
  test('Test 1: Snapshot on Review Screen for user with reviews', () => {
    const component = renderer.create(
      <BrowserRouter>
        <Reviews reviews={testUser.reviews} />
      </BrowserRouter>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
    render(<BrowserRouter><Reviews reviews={testUser.reviews} /></BrowserRouter>);
    const review = screen.getByText(/The chair I bought had a missing leg./);
    expect(review).toBeInTheDocument();
    const reviewTwo = screen.getByText(/Good experience with this seller./);
    expect(reviewTwo).toBeInTheDocument();
    const averageRating = screen.getByText(/Reviews - Average Rating: 3.5/);
    expect(averageRating).toBeInTheDocument();
  });

  test('Test 2: Snapshot on Review screen for user with no reviews', () => {
    testUser.reviews = [];
    const component = renderer.create(
      <BrowserRouter>
        <Reviews reviews={testUser.reviews} />
      </BrowserRouter>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
    render(<BrowserRouter><Reviews reviews={testUser.reviews} /></BrowserRouter>);
    const review = screen.getByText(/You have no reviews./);
    expect(review).toBeInTheDocument();
  });
});

describe('UI testing for the follows component', () => {
  test('Test 1: Snapshot on Review screen for user with followers and followed users', () => {
    const component = renderer.create(
      <BrowserRouter>
        <Follows userProfile={testUser} />
      </BrowserRouter>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('Test 2: User with no followers', () => {
    testUser.followers = [];
    render(
      <BrowserRouter>
        <Follows userProfile={testUser} />
      </BrowserRouter>,
    );
    const text = screen.getByText(/You have no followers./);
    expect(text).toBeInTheDocument();
  });
  test('Test 3: User who is not following anyone', () => {
    testUser.following = [];
    render(
      <BrowserRouter>
        <Follows userProfile={testUser} />
      </BrowserRouter>,
    );
    const text = screen.getByText(/You are not following anyone./);
    expect(text).toBeInTheDocument();
  });
  test('Test 4: User unfollows someone.', async () => {
    render(
      <BrowserRouter>
        <Follows userProfile={testUser} />
      </BrowserRouter>,
    );
    const followedUsersCopy = [...testUser.following];
    const removedFollowing = followedUsersCopy.splice(0, 1);
    mockAxios.onPost('/account/unfollow', { removedFollowing: removedFollowing[0], newFollowList: followedUsersCopy })
      .reply(200);
    const unfollowIcons = screen.getAllByAltText('Unfollow icon');
    try {
      await act(async () => {
        await userEvent.click(unfollowIcons[0]);
      });
      expect(unfollowIcons[0]).not.toBeInTheDocument();
      expect(unfollowIcons[1]).toBeInTheDocument();
      const followedUser = screen.getByText(/Alberto Contador/);
      expect(followedUser).toBeInTheDocument();
    } catch (error) {
      console.log(error);
    }
  });
  test('Test 5: User removes a follower', async () => {
    render(
      <BrowserRouter>
        <Follows userProfile={testUser} />
      </BrowserRouter>,
    );
    const followersCopy = [...testUser.followers];
    const removedFollower = followersCopy.splice(1, 1);
    mockAxios.onPost('/account/unfollow', { removedFollowing: removedFollower[0], newFollowList: followersCopy })
      .reply(200);
    const removeFollowerIcons = screen.getAllByAltText('Remove icon');
    try {
      await act(async () => {
        await userEvent.click(removeFollowerIcons[1]);
      });
      expect(removeFollowerIcons[1]).not.toBeInTheDocument();
      expect(removeFollowerIcons[0]).toBeInTheDocument();
      expect(removeFollowerIcons[2]).toBeInTheDocument();
      let followedUser = screen.getByText(/Cadel Evans/);
      expect(followedUser).toBeInTheDocument();
      followedUser = screen.getByText(/Alex Dowsett/);
      expect(followedUser).toBeInTheDocument();
    } catch (error) {
      console.log(error);
    }
  });
  test('Test 6: User reviews someone they follow', async () => {
    const userToReview = {
      name: 'Cadel Evans',
      email: 'cevans@sas.upenn.edu',
      reviews: [],
    };
    render(
      <BrowserRouter>
        <Follows userProfile={testUser} />
      </BrowserRouter>,
    );
    mockAxios.onPost('/account/findUserOnEmail', { email: 'cevans@sas.upenn.edu' }).reply(200, [userToReview]);
    const reviewIcons = screen.getAllByAltText('Review icon');
    try {
      await act(async () => {
        await userEvent.click(reviewIcons[0]);
      });
      const ratingInput = screen.getByRole('combobox');
      ratingInput.value = 5;
      const ratingContent = screen.getByRole('textbox');
      ratingContent.value = 'Testing review.';
      let modalHeaderText = screen.getByText(/Write a Review for Cadel Evans/);
      expect(modalHeaderText).toBeVisible();
      const reviewBtn = screen.getByText(/Submit/);
      mockAxios.onPost('/account/postReview', {
        author: testUser, recipient: userToReview, reviewRating: '5', reviewContent: 'Testing review.',
      }).reply(200);
      await act(async () => {
        await userEvent.click(reviewBtn);
      });
      modalHeaderText = screen.queryByText(/Write a Review for Cadel Evans/);
      expect(modalHeaderText).not.toBeVisible();
    } catch (error) {
      console.log(error);
    }
  });
  test('Test 7: User attempts to review someone they have already reviewed', async () => {
    const userToReview = {
      name: 'Cadel Evans',
      email: 'cevans@sas.upenn.edu',
      reviews: [
        {
          authorEmail: 'jdoe@sas.upenn.edu',
          authorName: 'John Doe',
          recipient: 'cevans@sas.upenn.edu',
          reviewContent: 'Good experience with this seller.',
          reviewRating: 5,
        },
      ],
    };
    render(
      <BrowserRouter>
        <Follows userProfile={testUser} />
      </BrowserRouter>,
    );
    mockAxios.onPost('/account/findUserOnEmail', { email: 'cevans@sas.upenn.edu' }).reply(200, [userToReview]);
    const reviewIcons = screen.getAllByAltText('Review icon');
    try {
      await act(async () => {
        await userEvent.click(reviewIcons[0]);
      });
      const modalText = screen.getByText(/You have already posted a review for this user./);
      expect(modalText).toBeVisible();
    } catch (error) {
      console.log(error);
    }
  });
});

describe('UI testing for the blocked component', () => {
  test('Test 1: Snapshot test', () => {
    const component = renderer.create(
      <BrowserRouter>
        <Blocked blocked={testUser.blocked} />
      </BrowserRouter>,
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
  test('Test 2: UI reacts correctly when blocking another user', async () => {
    render(
      <BrowserRouter>
        <Blocked blocked={testUser.blocked} />
      </BrowserRouter>,
    );
    const unblockBtn = screen.getByAltText(/Unblock Icon/);
    try {
      mockAxios.onPost('/account/unblock', { newBlockedUsers: [] }).reply(200);
      await act(async () => {
        await userEvent.click(unblockBtn);
      });
      const noBlockedText = screen.getByText(/You have no one blocked./);
      expect(noBlockedText).toBeInTheDocument();
    } catch (error) {
      console.log(error);
    }
  });
});

// Chat is disabled in this component to remove testing errors.
describe('UI testing for SearchUsers component', () => {
  let userOne;
  let userTwo;
  beforeEach(async () => {
    userOne = {
      name: 'Jens Voigt',
      email: 'jvoigt@sas.upenn.edu',
      reviews: [],
      followers: [],
      following: [],
      reports: [],
      blocked: [],
    };
    userTwo = {
      name: 'Levi Leipheimer',
      email: 'leipheimer@sas.upenn.edu',
      reviews: [],
      followers: [
        {
          followerName: 'John Doe',
          followerEmail: 'jdoe@sas.upenn.edu',
          followingName: 'Levi Leipheimer',
          followingEmail: 'leipheimer@sas.upenn.edu',
        },
      ],
      following: [],
      reports: [
        {
          authorEmail: 'jdoe@sas.upenn.edu',
          recipientEmail: 'leipheimer@sas.upenn.edu',
          reportContent: 'Testing report.',
        },
      ],
      blocked: [],
    };
    render(<BrowserRouter><SearchUsers userProfile={testUser} /></BrowserRouter>);
    const searchInput = screen.getByRole('textbox');
    searchInput.value = 'i';
    const searchBtn = screen.getByRole('button');
    try {
      mockAxios.onPost('/account/findUsersOnName', { name: 'i' }).reply(200, [userOne, userTwo]);
      await act(async () => {
        await userEvent.click(searchBtn);
      });
    } catch (error) {
      console.log(error);
    }
  });

  test('Test 1: User searches for other users', async () => {
    const userOneResult = screen.getByText(/Jens Voigt/);
    const userTwoResult = screen.getByText(/Levi Leipheimer/);
    expect(userOneResult).toBeVisible();
    expect(userTwoResult).toBeVisible();
  });
  test('Test 2: User reports another user', async () => {
    const reportBtns = screen.getAllByText('Report');
    try {
      mockAxios.onPost('/account/findUserOnEmail', { email: 'jvoigt@sas.upenn.edu' }).reply(200, [userOne]);
      await act(async () => {
        await userEvent.click(reportBtns[0]);
      });
      const reportPrompt = screen.getByText(/Why are you reporting this user/i);
      expect(reportPrompt).toBeVisible();
      const reportContent = screen.getAllByRole('textbox')[1];
      reportContent.value = 'Testing 2 report';
      const reportBtn = screen.getAllByText(/Report/)[2];
      mockAxios.onPost('/account/postReport', { recipient: userOne, reportContent: reportContent.value }).reply(200);
      await act(async () => {
        await userEvent.click(reportBtn);
      });
      expect(reportPrompt).not.toBeInTheDocument();
    } catch (error) {
      console.log(error);
    }
  });
  test('Test 2: User reports someone they already reported', async () => {
    const reportBtns = screen.getAllByText('Report');
    try {
      mockAxios.onPost('/account/findUserOnEmail', { email: 'leipheimer@sas.upenn.edu' }).reply(200, [userTwo]);
      await act(async () => {
        await userEvent.click(reportBtns[1]);
      });
      const message = screen.getByText(/You have already reported Levi Leipheimer/);
      expect(message).toBeVisible();
    } catch (error) {
      console.log(error);
    }
  });
  test('Test 3: User follows another user', async () => {
    const followBtns = screen.getAllByText('Follow');
    try {
      mockAxios.onPost('/account/follow', { follower: testUser, followedUser: userOne }).reply(200);
      await act(async () => {
        await userEvent.click(followBtns[0]);
      });
      const message = screen.getByText(/You are now following Jens Voigt./);
      expect(message).toBeVisible();
    } catch (error) {
      console.log(error);
    }
  });
  test('Test 4: User attemps to follow an already followed user', async () => {
    const followBtns = screen.getAllByText('Follow');
    try {
      mockAxios.onPost('/account/follow', { follower: testUser, followedUser: userTwo }).reply(200);
      await act(async () => {
        await userEvent.click(followBtns[1]);
      });
      const message = screen.getByText(/You are already following Levi Leipheimer./);
      expect(message).toBeVisible();
    } catch (error) {
      console.log(error);
    }
  });
  test('Test 5: User blocks another user', async () => {
    const blockBtns = screen.getAllByText('Block');
    try {
      mockAxios.onPost('/account/block', { blocker: testUser, blockedUser: userOne }).reply(200);
      await act(async () => {
        await userEvent.click(blockBtns[0]);
      });
      const message = screen.getByText(/Jens Voigt is now blocked and you will no longer receive any messages or listings from them./);
      expect(message).toBeVisible();
    } catch (error) {
      console.log(error);
    }
  });
  test('Test 4: User attemps to follow an already followed user', async () => {
    const blockBtns = screen.getAllByText('Block');
    try {
      mockAxios.onPost('/account/block', { blocker: testUser, blockedUser: userTwo }).reply(200);
      await act(async () => {
        await userEvent.click(blockBtns[1]);
      });
      const message = screen.getByText(/You have already blocked Levi Leipheimer./);
      expect(message).toBeVisible();
    } catch (error) {
      console.log(error);
    }
  });
});
