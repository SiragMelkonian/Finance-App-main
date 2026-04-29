DO $$
DECLARE
    func record;
BEGIN
    FOR func IN
        SELECT oid::regprocedure AS func_signature
        FROM pg_proc
        WHERE proname = 'calculate_total'
        AND pronamespace = 'public'::regnamespace
    LOOP
        EXECUTE 'DROP FUNCTION ' || func.func_signature;
    END LOOP;
END;
$$;

CREATE FUNCTION calculate_total (
	range_arg varchar default 'today',
	type_arg varchar default null
) returns table(current_amount numeric, previous_amount numeric) as $$
declare
	currentStart timestamp;
	currentEnd timestamp;
	previousStart timestamp;
	previousEnd timestamp;
begin
	currentEnd := now();
	currentStart := case
		when range_arg = 'today' then date_trunc('day', currentEnd)
		when range_arg = 'last7days' then currentEnd - interval '7 days'
		when range_arg = 'last30days' then currentEnd - interval '30 days'
		when range_arg = 'last12months' then currentEnd - interval '12 months'
		else date_trunc('day', currentEnd)
	end;
	previousEnd := currentStart - interval '1 second';
	previousStart := currentStart - (currentEnd - currentStart);
	current_amount := (
		select COALESCE(SUM(amount), 0)
		from transactions
		where
			(type = type_arg or type_arg is null)
			and (created_at between currentStart and currentEnd)
	);
	previous_amount := (
		select COALESCE(SUM(amount), 0)
		from transactions
		where
			(type = type_arg or type_arg is null)
			and (created_at between previousStart and previousEnd)
	);
	return next;
end;
$$ language plpgsql;

NOTIFY pgrst, 'reload schema';