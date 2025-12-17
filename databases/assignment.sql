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
WHERE s.id = 3;

-- 4. Find tasks that are not done
-- Tasks that are still pending or in progress.
SELECT t.id, t.title, t.status_id
FROM task t
JOIN status s ON t.status_id = s.id
WHERE s.id != 3;

- 5. Show all tasks, newest first
-- Sorting tasks by creation date descending.
SELECT t.*
FROM task t
ORDER BY t.created_at DESC;

--Remaining tasks--
-- 6. Show the single most recently created task
-- Just getting the latest task entry.
SELECT t.*
FROM task t
ORDER BY t.created_at DESC
LIMIT 1;

-- 7. Find tasks related to 'database'
-- Searching both title and description for 'database'.
SELECT t.title, t.due_date
FROM task t
WHERE t.title LIKE '%database%'
   OR t.description LIKE '%database%';

-- 8. Show task title with its status
-- Getting the status name instead of just the ID.
SELECT t.title, s.name AS status
FROM task t
JOIN status s ON t.status_id = s.id;

-- 9. Count how many tasks each status has
-- Using LEFT JOIN to include statuses with no tasks.
SELECT s.name AS status, COUNT(t.id) AS num_tasks
FROM status s
LEFT JOIN task t ON s.id = t.status_id
GROUP BY s.name;

-- 10. List statuses by number of tasks
-- Sorted so the status with the most tasks appears first.
SELECT s.name AS status, COUNT(t.id) AS num_tasks
FROM status s
LEFT JOIN task t ON s.id = t.status_id
GROUP BY s.name
ORDER BY num_tasks DESC;




