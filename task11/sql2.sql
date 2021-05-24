SELECT 
    *
FROM
    Discountropium.OFFER
        LEFT JOIN
    (SELECT 
        USERNAME, USER_ID
    FROM
        Discountropium.USER) AS USER ON OFFER.USER_ID = USER.USER_ID
WHERE
    USERNAME = 'Agatha Christie'