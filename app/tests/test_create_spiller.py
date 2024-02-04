import pytest
from typing import List, Optional
from lobby.models import Spiller
from django.contrib.auth.models import Group, Permission


@pytest.fixture
def spiller_group(db) -> Group:
    # Create group app_user
    group = Group.objects.create(name="app_user")
    change_user_permissions = Permission.objects.filter(
        codename__in=["change_user", "view_user"],
    )
    # Add "change_user" and "view_user" permissions
    group.permissions.add(*change_user_permissions)
    return group


# Pattern: factory as fixture
@pytest.fixture
def create_spiller_factory(db, spiller_group: Group):
    # Closure
    def create_spiller(
        username: str,
        password: Optional[str] = None,
        first_name: Optional[str] = "first name",
        last_name: Optional[str] = "last name",
        email: Optional[str] = "foo@bar.com",
        is_staff: str = False,
        is_superuser: str = False,
        is_active: str = True,
        groups: List[Group] = [],
    ) -> Spiller:
        spiller = Spiller.objects.create_user(
            username=username,
            password=password,
            first_name=first_name,
            last_name=last_name,
            email=email,
            is_staff=is_staff,
            is_superuser=is_superuser,
            is_active=is_active,
        )
        spiller.groups.add(spiller_group)
        spiller.groups.add(*groups)
        return spiller
    return create_spiller


@pytest.fixture
def spiller_A(create_spiller_factory) -> Spiller:
    return create_spiller_factory('A')


@pytest.fixture
def spiller_B(create_spiller_factory) -> Spiller:
    return create_spiller_factory('B')


def test_should_create_spiller_with_username(spiller_A: Spiller) -> None:
    assert spiller_A.username == "A"


def test_should_check_password(spiller_A: Spiller) -> None:
    spiller_A.set_password("secret")
    assert spiller_A.check_password("secret") is True


def test_should_not_check_unusable_password(spiller_A: Spiller) -> None:
    spiller_A.set_password("secret")
    spiller_A.set_unusable_password()
    assert spiller_A.check_password("secret") is False


def test_spiller_is_in_spiller_group(spiller_A: Spiller) -> None:
    assert spiller_A.groups.filter(name="app_user").exists()


def test_should_create_two_users(spiller_A: Spiller, spiller_B: Spiller) -> None:
    assert spiller_A.pk != spiller_B.pk
    