-- 1. Count all tasks in the task table
-- Just checking how many tasks exist in total.
SELECT COUNT(*) AS total_tasks
FROM task t;
- 2. Count tasks that don’t have a due date
-- Some tasks don’t have deadlines, so let's see how many.
SELECT COUNT(*) AS no_due_date
FROM task t
WHERE t.due_date IS NULL;

- 3. Find all tasks that are done
-- Looking for tasks with 'done' status.
SELECT t.id, t.title, t.description, t.due_date, t.created_at
FROM task t
JOIN status s ON t.status_id = s.id
WHERE s.name = 'done';

-- 4. Find tasks that are not done
-- Tasks that are still pending or in progress.
SELECT t.id, t.title, t.status_id
FROM task t
JOIN status s ON t.status_id = s.id
WHERE s.name <> 'done';

- 5. Show all tasks, newest first
-- Sorting tasks by creation date descending.
SELECT t.*
FROM task t
ORDER BY t.created_at DESC;

