import { snakeToCamel } from "./snakeToCamel";

describe("snakeToCamel 함수 테스트", () => {
  test("원시 타입 값은 변경 없이 그대로 반환한다", () => {
    expect(snakeToCamel("hello_world")).toBe("hello_world"); // 문자열은 값으로 취급, 키가 아님
    expect(snakeToCamel(123)).toBe(123);
    expect(snakeToCamel(true)).toBe(true);
    expect(snakeToCamel(null)).toBe(null);
    expect(snakeToCamel(undefined)).toBe(undefined);
  });

  test("단순 객체의 키를 스네이크 케이스에서 카멜 케이스로 변환한다", () => {
    const input = {
      user_id: 1,
      first_name: "홍",
      last_name: "길동",
      created_at: "2023-01-01"
    };

    const expected = {
      userId: 1,
      firstName: "홍",
      lastName: "길동",
      createdAt: "2023-01-01"
    };

    expect(snakeToCamel(input)).toEqual(expected);
  });

  test("중첩된 객체도 모든 레벨의 키가 변환된다", () => {
    const input = {
      user_data: {
        profile_image: "url",
        address_info: {
          postal_code: "12345",
          street_address: "서울시 강남구"
        }
      }
    };

    const expected = {
      userData: {
        profileImage: "url",
        addressInfo: {
          postalCode: "12345",
          streetAddress: "서울시 강남구"
        }
      }
    };

    expect(snakeToCamel(input)).toEqual(expected);
  });

  test("배열 내의 객체도 모두 변환된다", () => {
    const input = [
      { item_id: 1, item_name: "물건1" },
      { item_id: 2, item_name: "물건2" }
    ];

    const expected = [
      { itemId: 1, itemName: "물건1" },
      { itemId: 2, itemName: "물건2" }
    ];

    expect(snakeToCamel(input)).toEqual(expected);
  });

  test("복합적인 데이터 구조(배열, 객체, 중첩)도 올바르게 변환된다", () => {
    const input = {
      user_list: [
        {
          user_id: 1,
          user_detail: {
            birth_date: "1990-01-01",
            school_history: [
              { school_name: "가나다초등학교", graduation_year: 2003 },
              { school_name: "라마바중학교", graduation_year: 2006 }
            ]
          }
        },
        {
          user_id: 2,
          user_detail: {
            birth_date: "1992-05-20",
            school_history: [
              { school_name: "사아자초등학교", graduation_year: 2005 }
            ]
          }
        }
      ],
      total_count: 2,
      page_info: {
        current_page: 1,
        items_per_page: 10
      }
    };

    const expected = {
      userList: [
        {
          userId: 1,
          userDetail: {
            birthDate: "1990-01-01",
            schoolHistory: [
              { schoolName: "가나다초등학교", graduationYear: 2003 },
              { schoolName: "라마바중학교", graduationYear: 2006 }
            ]
          }
        },
        {
          userId: 2,
          userDetail: {
            birthDate: "1992-05-20",
            schoolHistory: [
              { schoolName: "사아자초등학교", graduationYear: 2005 }
            ]
          }
        }
      ],
      totalCount: 2,
      pageInfo: {
        currentPage: 1,
        itemsPerPage: 10
      }
    };

    expect(snakeToCamel(input)).toEqual(expected);
  });

  test("이미 카멜케이스인 키는 변경되지 않는다", () => {
    const input = {
      userId: 1,
      user_name: "홍길동",
      userAge: 30
    };

    const expected = {
      userId: 1,
      userName: "홍길동",
      userAge: 30
    };

    expect(snakeToCamel(input)).toEqual(expected);
  });
});
