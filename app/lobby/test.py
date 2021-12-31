class Test:
    test = 'A'

    def __init__(self, test = None):
        print(test)
        print(self.test)
        test = test or self.test
        self.test = test


if __name__ == '__main__':
    B = Test(test='B')
    """
    A = Test()

    print(B.test)
    print(A.test)
    print(Test.test)"""