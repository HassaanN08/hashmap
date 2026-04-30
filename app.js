const Node = (key, value, nextNode = null) => {
    return {
        key,
        value,
        nextNode,
    }
}

const createBuckets = (capacity) => {
    let buckets = [];

    for (let i = 0; i < capacity; i++) {
        buckets.push(null);
    }

    return buckets;
}

const hash = (key, capacity) => {
    if (typeof key != 'string') throw new Error("Only use strings please");

    let hashCode = 0;
    const primeNumber = 31;

    for (let i = 0; i < key.length; i++) {
        hashCode = (key.charCodeAt(i) + (hashCode * primeNumber)) % capacity;
    }

    return hashCode;
}

const insertIntoBuckets = (key, value, buckets, capacity) => {
    const index = hash(key, capacity);
    let head = buckets[index];

    if (!head) {
        buckets[index] = Node(key, value);
    } else {
        while(head) {
            if (head.key === key) {
                head.value = value;
                return true;
            }

            if (!head.nextNode) break;
            head = head.nextNode;
        }

        head.nextNode = Node(key, value);
    }

    return false;
}

const HashMap = () => {
    let loadFactor = 0.75;
    let capacity = 16;
    let size = 0;

    let buckets = createBuckets(capacity);

    const set = (key, value) => {
        const exists = insertIntoBuckets(key, value, buckets, capacity);

        if (!exists) size++;
        else return;

        if (size > capacity * loadFactor) {
            
            capacity = 2 * capacity;

            let oldBuckets = buckets;
            clear();
            
            for (let i = 0; i < oldBuckets.length; i++) {
                if (!oldBuckets[i]) continue;

                let bucket = oldBuckets[i];

                while(bucket) {
                    insertIntoBuckets(bucket.key, bucket.value, buckets, capacity);

                    size++;

                    bucket = bucket.nextNode;
                }
            }
        }
    }

    const get = (key) => {
        const index = hash(key, capacity);
        let bucket = buckets[index];

        let head = bucket;

        if (!bucket) return null;

        while (head != null) {
            if (head.key === key) {
                return head.value;
            }

            head = head.nextNode;
        }

        return null;
    }

    const has = (key) => {
        const index = hash(key, capacity);
        let bucket = buckets[index];

        let head = bucket;

        if(!bucket) return false;

        while(head != null) {
            if (head.key === key) return true;

            head = head.nextNode;
        }

        return false;
    }

    const remove = (key) => {
        const index = hash(key, capacity);
        let bucket = buckets[index];

        let head = bucket;

        if (!bucket) return false;

        if (bucket.key === key) {
            buckets[index] = buckets[index].nextNode;
            size--;
            return true;
        }

        while(head != null) {
            if (head.nextNode && head.nextNode.key === key) {
                head.nextNode = head.nextNode.nextNode;
                size--;
                return true;
            }

            head = head.nextNode;
        }

        return false;
    }

    const length = () => {
        return size;
    }

    const clear = () => {
        buckets = createBuckets(capacity);
        size = 0;
    }

    const keys = () => {
        let arr = [];
        for (let i = 0; i < capacity; i++) {
            if (!buckets[i]) continue;

            let head = buckets[i];

            while (head != null) {
                arr.push(head.key);

                head = head.nextNode;
            }
        }

        return arr;
    }

    const values = () => {
        let arr = [];
        for (let i = 0; i < capacity; i++) {
            if (!buckets[i]) continue;

            let head = buckets[i];

            while (head != null) {
                arr.push(head.value);

                head = head.nextNode;
            }
        }

        return arr;
    }

    const entries = () => {
        let arr = [];
        for (let i = 0; i < capacity; i++) {
            if (!buckets[i]) continue;

            let head = buckets[i];

            while (head != null) {
                arr.push([head.key, head.value]);

                head = head.nextNode;
            }
        }

        return arr;
    }

    return { set, get, has, remove, length, clear, keys, values, entries };
}

export default HashMap;