SELECT 
    *
FROM
    Discountropium.OFFER
        LEFT JOIN
    (SELECT 
        USERNAME, USER_ID
    FROM
        Discountropium.user) AS USER ON OFFER.USER_ID = USER.USER_ID
WHERE
    USERNAME = 'Agata Kristi'
        AND DATE(CREATED_AT) = '2021-03-01'