SELECT
    ${stringParam}::text as string_value,
    ${intParam}::integer as int_value,
    ${boolParam}::boolean as bool_value,
    ${nullParam} as null_value,
    ${repeatedParam} as first_occurrence,
    ${repeatedParam} as second_occurrence,
    CURRENT_TIMESTAMP as current_time,
    'constant_value' as constant,
    CASE WHEN ${conditionalParam} IS NOT NULL THEN 'has_value' ELSE 'no_value' END as conditional_check
WHERE 1=1