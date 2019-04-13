/**
 * @return {Object} Fixture data
 * @function
 */
export default function getFixtureData() {
  return {
    __collection__: {
      chats: {
        __doc__: {
          site_a__page_a__user_b: {
            creator: '__ref__:users/user_b',
            isPublic: true,
            lastActivityTimestamp: new Date('2018-01-02'),
            lastMessage: '__ref__:messages/message_b',
            page: '__ref__:pages/site_a__page_a',
            site: '__ref__:sites/site_a',
          },

          site_a__page_a__user_c: {
            creator: '__ref__:users/user_c',
            isPublic: false,
            lastActivityTimestamp: new Date('2018-01-04'),
            lastMessage: '__ref__:messages/message_c',
            page: '__ref__:pages/site_a__page_a',
            site: '__ref__:sites/site_a',
          },
        },
      },

      messages: {
        __doc__: {
          message_a: {
            author: '__ref__:users/user_b',
            chat: '__ref__:chats/site_a__page_a__user_b',
            createdOn: new Date('2018-01-01'),
            media: null,
            text: 'Message A',
          },

          message_b: {
            author: '__ref__:users/user_b',
            chat: '__ref__:chats/site_a__page_a__user_b',
            createdOn: new Date('2018-01-02'),
            media: null,
            text: 'Message B',
          },

          message_c: {
            author: '__ref__:users/user_c',
            chat: '__ref__:chats/site_a__page_a__user_c',
            createdOn: new Date('2018-01-04'),
            media: null,
            text: 'Message C',
          },
        },
      },

      pages: {
        __doc__: {
          site_a__page_a: {
            createdOn: new Date('2018-01-01'),
            description: 'Page A Description',
            imageUrl: 'page_a.jpg',
            slug: '%2Ffoo%2Fbar',
            title: 'Page A Title',
            site: '__ref__:sites/site_a',
          },
        },
      },

      sites: {
        __doc__: {
          site_a: {
            brandColor: '#212121',
            displayName: 'Site A',
            hostname: 'site_a.com',
            imageUrl: 'site_a.jpg',
            isVerified: true,
            name: 'site a',
            theme: 'light',

            __collection__: {
              admins: {
                __doc__: {
                  user_a: {
                    cloudFirestoreReference: '__ref__:users/user_a',
                    name: 'user a',
                  },
                },
              },
            },
          },
        },
      },

      users: {
        __doc__: {
          user_a: {
            displayName: 'User A',
            displayUsername: 'user_a',
            name: 'user a',
            photoUrl: 'user_a.jpg',
            shortBio: null,
            username: 'user_a',

            __collection__: {
              chats: {
                __doc__: {
                  site_a__page_a__user_b: {
                    creator: '__ref__:users/user_b',
                    isPublic: true,
                    lastActivityTimestamp: new Date('2018-01-02'),
                    lastMessage: '__ref__:messages/message_b',
                    page: '__ref__:pages/site_a__page_a',
                    site: '__ref__:sites/site_a',
                  },

                  site_a__page_a__user_c: {
                    creator: '__ref__:users/user_c',
                    isPublic: false,
                    lastActivityTimestamp: new Date('2018-01-04'),
                    lastMessage: '__ref__:messages/message_c',
                    page: '__ref__:pages/site_a__page_a',
                    site: '__ref__:sites/site_a',
                  },
                },
              },

              sitesAsAdmin: {
                __doc__: {
                  site_a: {
                    cloudFirestoreReference: '__ref__:sites/site_a',
                    name: 'site a',
                  },
                },
              },
            },
          },

          user_b: {
            displayName: 'User B',
            displayUsername: 'user_b',
            name: 'user b',
            photoUrl: 'user_b.jpg',
            shortBio: null,
            username: 'user_b',

            __collection__: {
              chats: {
                __doc__: {
                  site_a__page_a__user_b: {
                    creator: '__ref__:users/user_b',
                    isPublic: true,
                    lastActivityTimestamp: new Date('2018-01-02'),
                    lastMessage: '__ref__:messages/message_b',
                    page: '__ref__:pages/site_a__page_a',
                    site: '__ref__:sites/site_a',
                  },
                },
              },
            },
          },

          user_c: {
            displayName: 'User C',
            displayUsername: 'user_c',
            name: 'user c',
            photoUrl: 'user_c.jpg',
            shortBio: null,
            username: 'user_c',

            __collection__: {
              chats: {
                __doc__: {
                  site_a__page_a__user_c: {
                    creator: '__ref__:users/user_c',
                    isPublic: false,
                    lastActivityTimestamp: new Date('2018-01-04'),
                    lastMessage: '__ref__:messages/message_c',
                    page: '__ref__:pages/site_a__page_a',
                    site: '__ref__:sites/site_a',
                  },
                },
              },
            },
          },

          user_d: {
            displayName: 'User D',
            displayUsername: 'user_d',
            name: 'user d',
            photoUrl: 'user_d.jpg',
            shortBio: null,
            username: 'user_d',
          },
        },
      },
    },
  };
}
