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
              members: {
                __doc__: {
                  user_a: {
                    cloudFirestoreReference: '__ref__:users/user_a',
                    role: 1,
                    username: 'user a',
                  },
                },
              },

              slugs: {
                __doc__: {
                  '%2Ffoo%2Fbar': {
                    cloudFirestoreReference: '__ref__:pages/site_a__page_a',
                  },
                },
              },
            },
          },

          site_b: {
            brandColor: '#212121',
            displayName: 'Site B',
            hostname: 'site_b.com',
            imageUrl: 'site_b.jpg',
            isVerified: true,
            name: 'site b',
            theme: 'light',

            __collection__: {
              members: {
                __doc__: {
                  user_a: {
                    cloudFirestoreReference: '__ref__:users/user_a',
                    role: 3,
                    username: 'user a',
                  },

                  user_b: {
                    cloudFirestoreReference: '__ref__:users/user_b',
                    role: 1,
                    username: 'user b',
                  },
                },
              },
            },
          },

          site_c: {
            brandColor: '#212121',
            displayName: 'Site C',
            hostname: 'site_c.com',
            imageUrl: 'site_c.jpg',
            isVerified: false,
            name: 'site c',
            theme: 'light',

            __collection__: {
              members: {
                __doc__: {
                  user_a: {
                    cloudFirestoreReference: '__ref__:users/user_a',
                    role: 1,
                    username: 'user a',
                  },
                },
              },
            },
          },
        },
      },

      usernames: {
        __doc__: {
          user_a: {
            cloudFirestoreReference: '__ref__:users/user_a',
          },

          user_b: {
            cloudFirestoreReference: '__ref__:users/user_b',
          },

          user_c: {
            cloudFirestoreReference: '__ref__:users/user_c',
          },

          user_d: {
            cloudFirestoreReference: '__ref__:users/user_d',
          },
        },
      },

      users: {
        __doc__: {
          user_a: {
            displayUsername: 'user_a',
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

              sites: {
                __doc__: {
                  site_a: {
                    cloudFirestoreReference: '__ref__:sites/site_a',
                    name: 'site a',
                    role: 1,
                  },

                  site_b: {
                    cloudFirestoreReference: '__ref__:sites/site_b',
                    name: 'site b',
                    role: 3,
                  },

                  site_c: {
                    cloudFirestoreReference: '__ref__:sites/site_c',
                    name: 'site c',
                    role: 1,
                  },
                },
              },
            },
          },

          user_b: {
            displayUsername: 'user_b',
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

              sites: {
                __doc__: {
                  site_b: {
                    cloudFirestoreReference: '__ref__:sites/site_b',
                    name: 'site b',
                    role: 1,
                  },
                },
              },
            },
          },

          user_c: {
            displayUsername: 'user_c',
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
            displayUsername: 'user_d',
            photoUrl: 'user_d.jpg',
            shortBio: null,
            username: 'user_d',
          },
        },
      },
    },
  };
}
